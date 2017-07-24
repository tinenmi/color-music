const stateInFile = require('./state-in-file.js')

const colorProgramBase = [
  [[255,0,0], [0,255,0], [0,0,255], [0,0,0]],
  [[0,255,0], [0,0,255], [0,0,0], [255,0,0]],
  [[0,0,255], [0,0,0], [255,0,0], [0,255,0]],
  [[0,0,0], [255,0,0], [0,255,0], [0,0,255]],
  [[0,255,0], [0,0,255], [0,0,0], [255,0,0]],
  [[0,0,255], [0,0,0], [255,0,0], [0,255,0]],
  [[0,0,0], [255,0,0], [0,255,0], [0,0,255]],
  [[255,0,0], [0,255,0], [0,0,255], [0,0,0]],
  [[0,0,255], [0,0,0], [255,0,0], [0,255,0]],
  [[0,0,0], [255,0,0], [0,255,0], [0,0,255]],
  [[255,0,0], [0,255,0], [0,0,255], [0,0,0]],
  [[0,255,0], [0,0,255], [0,0,0], [255,0,0]],
  [[0,0,0], [255,0,0], [0,255,0], [0,0,255]],
  [[255,0,0], [0,255,0], [0,0,255], [0,0,0]],
  [[0,255,0], [0,0,255], [0,0,0], [255,0,0]],
  [[0,0,255], [0,0,0], [255,0,0], [0,255,0]],
  [[255,0,0], [0,255,0], [0,0,255], [0,0,0]],
  [[0,255,0], [0,0,255], [0,0,0], [255,0,0]],
  [[0,0,255], [0,0,0], [255,0,0], [0,255,0]],
  [[0,0,0], [255,0,0], [0,255,0], [0,0,255]],
  [[0,255,0], [0,0,255], [0,0,0], [255,0,0]],
  [[0,0,255], [0,0,0], [255,0,0], [0,255,0]],
  [[0,0,0], [255,0,0], [0,255,0], [0,0,255]],
  [[255,0,0], [0,255,0], [0,0,255], [0,0,0]],
  [[0,0,255], [0,0,0], [255,0,0], [0,255,0]],
  [[0,0,0], [255,0,0], [0,255,0], [0,0,255]],
  [[255,0,0], [0,255,0], [0,0,255], [0,0,0]],
  [[0,255,0], [0,0,255], [0,0,0], [255,0,0]],
  [[0,0,0], [255,0,0], [0,255,0], [0,0,255]],
  [[255,0,0], [0,255,0], [0,0,255], [0,0,0]],
  [[0,255,0], [0,0,255], [0,0,0], [255,0,0]],
  [[0,0,255], [0,0,0], [255,0,0], [0,255,0]]
]

let colorProgram =
colorProgramBase.map( tact =>
  ({
      active: false,
      cells: tact.map(
        (lamp) =>
        ({color: {red: lamp[0], green: lamp[1], blue: lamp[2]}, selected: false})
      )
  })
)

const cursor = 2;

const isRunning = false;

const isSmoothly = false;

const speed = 125;

colorProgram[cursor].active = true;

const filename = './data';

const save = () => {
  return stateInFile.writeObjectDeffered({
    filename: filename,
    object: {
      colorProgram, isRunning, isSmoothly, speed
    }
  })
}

const state = {colorProgram, cursor, isRunning, isSmoothly,
  speed, save, onLoadHandlers: []}

/*stateInFile.readObject({filename: filename})
.then((newState) => {
  state.colorProgram = newState.colorProgram;
  state.isRunning = newState.isRunning;
  state.isSmoothly = newState.isSmoothly;
  state.speed = newState.speed;
  state.onLoadHandlers.forEach(x=>{
    x();
  });
})*/

export default state
