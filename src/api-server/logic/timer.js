import state from '../state.js'

let timerHandlers = [];

let restPeriod = 0;
export const timerFunction = () => {
  restPeriod += 1 / 10 / 60 * state.speed;
  while(true) {
    timerHandlers.forEach((handler) => {
      handler(restPeriod);
    })
    if (restPeriod < 1)
      break;
    restPeriod--;
  }
}

let timer = null;

export const isRunning = () => ({value: state.isRunning})

export const start = () => {
  state.isRunning = true;
  if (timer == null) {
    timer = setInterval(timerFunction, 25);
  }
  return {value: isRunning}
}

export const pause = () => {
  state.isRunning = false;
  if (timer != null) {
    clearInterval(timer);
    timer = null;
  }
  return {value: state.isRunning}
}

export const addTimerHandler = (handler) => {
  timerHandlers.push(handler)
}
