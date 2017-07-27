import ApiCreator from './api-creator'

import {isRunning, start, pause, addTimerHandler} from './logic/timer.js'
import {isSmoothly, smoothly, noSmoothly} from './logic/smoothly'
import {getSpeed, setSpeed} from './logic/speed'
import {getProgram, setProgramCell, changeSize} from './logic/color-program'
import {getCursor, setCursor, subscribeCursor, getColors, increment} from './logic/cursor'

export default (routers) => {
  const apiCreator = new ApiCreator(routers)
  apiCreator.property({
    get: {
      path: 'colorProgram', handler: getProgram
    },
    posts: [
      { path: 'colorProgramCell', handler: setProgramCell },
    ]
  })

  apiCreator.post('cursor', setCursor)
  subscribeCursor(() => {
    cursorStream.update();
    colorsStream.update(1)
  })

  const cursorStream = apiCreator.streamedValue('cursor', getCursor)
  const colorsStream = apiCreator.streamedValue('colors', (restPeriod) => (
    {value: getColors(restPeriod)}
  ));

  addTimerHandler((restPeriod) => {
    if (restPeriod > 1){
      increment()
    }
  })
  addTimerHandler((restPeriod) => {
    if (restPeriod > 1){
      cursorStream.update()
    }
  })
  addTimerHandler((restPeriod)=>{colorsStream.update(restPeriod)})

  apiCreator.post('changeSize', changeSize);

  apiCreator.property({
    get: {
      path: 'isRunning', handler: isRunning
    },
    posts: [
      { path: 'start', handler: start },
      { path: 'pause', handler: pause }
    ]
  })

  apiCreator.property({
    get: {
      path: 'isSmoothly', handler: isSmoothly
    },
    posts: [
      { path: 'smoothly', handler: smoothly },
      { path: 'noSmoothly', handler: noSmoothly }
    ]
  })

  apiCreator.property({
    get: {
      path: 'speed', handler: getSpeed
    },
    posts: [
      { path: 'speed', handler: setSpeed },
    ]

  })
}
