import fetch from 'isomorphic-fetch';

const g = global || window;

const remote_ip = (typeof(g.colormusic) === 'undefined')
                  ? 'localhost'
                  : g.colormusic.remote_ip;

const host = `${remote_ip}:3000/api`
const ws_host = `${remote_ip}:8080/api`


export const get = async (url) => {
  const response = await fetch(`http://${host}${url}`)
  return response.json();
}

const postOptionsFor = (body) => ({
  method: 'post',
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  },
  body: JSON.stringify(body)
})

export const post = async (url, body = {}) => {
  const response = await fetch(`http://${host}${url}`, postOptionsFor(body))
  return response.json();
}

export const stream = (url) => {
  const webSocket = new WebSocket(`ws://${ws_host}${url}.stream`, "protocolOne");
  let handlers = []
  const result = {then: (handler)=>{handlers.push(handler)}}
  webSocket.onmessage = (event) => {
    var jsonData = JSON.parse(event.data)
    handlers.forEach(x => x(jsonData))
  }
  return result;
}
