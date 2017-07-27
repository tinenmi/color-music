import ip from 'ip';
import React from 'react';
import express, {Router} from 'express'
import expressWsRoutes from 'express-ws-routes'
import http from 'http';
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path';
import { StaticRouter, matchPath } from 'react-router-dom'
import { renderToString } from 'react-dom/server'


import App from './App';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

if (typeof(global.colormusic) === 'undefined') {
  global.colormusic = {}
}

global.colormusic.remote_ip = ip.address()
if (global.colormusic.ws_server!= null) {
  global.colormusic.ws_server.close()
}

const server = express()
const ws_options = {};
const ws_app = expressWsRoutes.extendExpress(ws_options)();
const ws_server = http.createServer(ws_app);
ws_server.wsServer = expressWsRoutes.createWebSocketServer(ws_server, ws_app, ws_options);
ws_server.listen(8080, function() {
    console.log('Server listening on port 8080...');
});
global.colormusic.ws_server = ws_server

const ws_router = Router();
ws_router.websocket('/try.stream', function(info, cb, next) {
    cb(function(socket) {
        socket.send('connected!');
    });
});



import api from './api-server';
const apiRouters = api()
ws_app
  .use('/api', apiRouters.ws)

server
  .disable('x-powered-by')
  .use(cors())
  .use(bodyParser.json())
  .use('/api', apiRouters.rest)
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <link rel="apple-touch-icon" href="public/touch-icon-iphone.png">
          <link rel="manifest" href="public/manifest.json">
          <link rel="shortcut icon" href="public/favicon.ico">
        <meta charSet='utf-8' />
        <title>Color Music</title>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        ${assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''}
          <script>window.colormusic = {remote_ip: "${global.colormusic.remote_ip}"}</script>
    </head>
    <body>
        <div id="root">${markup}</div>
        <script src="${assets.client.js}"></script>
    </body>
</html>`
      );
    }
  });

export default server;
