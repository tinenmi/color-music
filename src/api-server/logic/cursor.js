import state from '../state'

let cursorChangeListeners = [];

export const getCursor = () => (state.cursor)

const nextLineCursor = (colorProgram, tactIndex) => {
  tactIndex++;
  if (tactIndex >= colorProgram.length) {
    tactIndex = 0;
  }
  return tactIndex
}
const med = (a, b, percent) => Math.round(a * (1-percent) + b * percent)

export const getColors = (restPeriod) => {
  const {colorProgram} = state
  const tactIndex = state.cursor
  let colors = colorProgram[tactIndex].cells.map(x=>x.color)

  if (state.isSmoothly) {
    const next = nextLineCursor(colorProgram, tactIndex);
    const nextColors = colorProgram[next].cells.map(x=>x.color)
    colors = colors.map((с, index) => ({
      red: med(с.red, nextColors[index].red, restPeriod),
      green: med(с.green, nextColors[index].green, restPeriod),
      blue: med(с.blue, nextColors[index].blue, restPeriod)})
    )
  }

  return {
    colors
  }
}

export const increment = () => {
  const {colorProgram} = state
  let tactIndex = state.cursor
  state.cursor = nextLineCursor(colorProgram, tactIndex)
}
