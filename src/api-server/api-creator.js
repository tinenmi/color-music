import PATHS from '../common/api-paths.js'

export default class ApiCreator{
  constructor(routers) {
    this.routers = routers
  }

  get(path, handler) {
    this.routers.rest.get(PATHS(path), (req, res) => {
      const resJson = handler(req)
      res.json(resJson)
    })
  }

  post(path, handler) {
    this.routers.rest.post(PATHS(path), (req, res) => {
      const resJson = handler(req.body)
      res.json(resJson);
    });
  }

  stream(path, handler) {
    let listeners = [];
    this.routers.ws.websocket(PATHS(path) + '.stream', (info, cb, next) => {
      cb((socket) => {
        listeners.push(socket)
        var jsonRes = JSON.stringify(handler());
        socket.send(jsonRes);
        socket.on('close', function() {
          var index = listeners.indexOf(socket);
          if (index > -1) {
            listeners.splice(index, 1);
          }
        });
      });
    });
    return {listeners, handler, update: (params) => {
      var jsonRes = JSON.stringify(handler(params));
      listeners.forEach(function(ws) {
        ws.send(jsonRes);
      })
    }}
  }

  streamedValue(path, handler) {
    this.get(path, handler)
    return this.stream(path, handler)
  }

  property ({get, posts}) {
    this.get(get.path, get.handler);
    posts.forEach((post)=>{
      this.post(post.path, (reqbody) => {
        post.handler(reqbody)
        return get.handler()
      });
    })
  }
}
