import state from '../state'

let cursorChangeListeners = [];

export const getCursor = () => (state.cursor)

export const setCursor = ({tactIndex}) => {
  const {colorProgram} = state
  if (tactIndex  < 0) {
    tactIndex = 0
  }
  if (tactIndex  >= colorProgram.length - 1) {
    tactIndex = colorProgram.length - 1
  }
  state.cursor = tactIndex;
  cursorHandlers.forEach(x => x(state.cursor))
  return state.cursor
}

const cursorHandlers = []
export const subscribeCursor = (handler) => {
  cursorHandlers.push(handler)
}

const nextLineCursor = (colorProgram, tactIndex) => {
  tactIndex++;
  if (tactIndex >= colorProgram.length) {
    tactIndex = 0;
  }
  return tactIndex
}

const prevLineCursor = (colorProgram, tactIndex) => {
  tactIndex--;
  if (tactIndex < 0) {
    tactIndex = colorProgram.length-1;
  }
  return tactIndex
}
const med = (a, b, percent) => Math.round(a * (percent) + b * (1 - percent))

export const getColors = (restPeriod) => {
  const {colorProgram} = state
  const tactIndex = state.cursor
  let colors = colorProgram[tactIndex].cells.map(x=>x.color)
  if (state.isSmoothly) {
    const prev = prevLineCursor(colorProgram, tactIndex);
    const prevtColors = colorProgram[prev].cells.map(x=>x.color)
    colors = colors.map((с, index) => ({
      red: med(с.red, prevtColors[index].red, restPeriod),
      green: med(с.green, prevtColors[index].green, restPeriod),
      blue: med(с.blue, prevtColors[index].blue, restPeriod)})
    )
  }

  colors = colors.map((c)=> ({
    red: Number.isInteger(c.red) ? c.red : 0,
    green: Number.isInteger(c.green) ? c.green : 0,
    blue: Number.isInteger(c.blue) ? c.blue : 0
  }))
  return {
    colors
  }
}

export const increment = () => {
  const {colorProgram} = state
  let tactIndex = state.cursor
  state.cursor = nextLineCursor(colorProgram, tactIndex)
}
