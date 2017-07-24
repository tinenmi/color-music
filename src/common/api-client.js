import {get, post, stream} from './json-fetch.js';
import PATHS from './api-paths.js';

const prepareParams = (params, defaultParams = {}) => {
  return Object.assign({}, defaultParams, params)
}

const apiGet = (path, defaultParams) => {

  return async (params = {}) => {
    return await get(path, prepareParams(params, defaultParams))
  }
}

const apiPost = (path, defaultParams) => {
  return async (params = {}) => (await post(path, prepareParams(params, defaultParams)))
}

const apiStream = (path, defaultParams) => {
  return () => (stream(path))
}

const Api = {
  pushApiGet: function(name, defaultParams = {}) {
    this[name] = apiGet(PATHS(name), defaultParams)
  },

  pushApiPost: function(name, defaultParams = {}) {
    this[name] = apiPost(PATHS(name), defaultParams)
  }
};
(['colorProgram', 'cursor', 'isRunning', 'isSmoothly', 'speed']).map(x => Api.pushApiGet(x));
(['start', 'pause', 'smoothly', 'noSmoothly']).map(x => Api.pushApiPost(x));
Api.cursorStream = apiStream(PATHS('cursor'))
Api.setColorProgramCell = apiPost(PATHS('colorProgramCell'),
  {
    tactIndex: 0,
    cellIndex: 0,
    newColor: {red: 0, green: 0, blue: 0}
  }
)
Api.setSpeed = apiPost(PATHS('speed'), {newValue: 0})
Api.pushApiPost('changeSize', {newSize: 0})

export default Api
