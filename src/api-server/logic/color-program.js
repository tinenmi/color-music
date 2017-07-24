import state from '../state'
import {readObject, writeObjectDeffered} from '../state-in-file'
import stateInFile from '../state-in-file.js'
const filename = "./colorProgram.json"

/*readObject({filename}).then((newColorProgram)=>{
  state.colorProgram = newColorProgram
})*/

const newLine = () => {
  return {
        active: false, cells: [
          {color: { red:0, green:0, blue: 0}, selected: false},
          {color: { red:0, green:0, blue: 0}, selected: false},
          {color: { red:0, green:0, blue: 0}, selected: false},
          {color: { red:0, green:0, blue: 0}, selected: false}
        ]
      }
}


const save = () => {
  writeObjectDeffered({filename, object: state.colorProgram});
}

export const getProgram = () => (state.colorProgram)

export const setProgramCell = ({tactIndex, cellIndex, newColor}) => {
  while(tactIndex >= state.colorProgram.length) {
    state.colorProgram.push(newLine())
  }

  state.colorProgram[tactIndex].cells[cellIndex].color = newColor;
  save();
  if (state.cursor.tactIndex == tactIndex) {
    var jsonRes = JSON.stringify({
      value: state.colorProgram[tactIndex],
      isSmoothly: isSmoothly
    });
    colorsChangeListeners.forEach(function(ws) {
      ws.send(jsonRes);
    })
  }
  return getProgram();
}

export const changeSize = ({newSize}) => {
  while(newSize > state.colorProgram.length) {
    state.colorProgram.push(newLine())
  }
  while(newSize < state.colorProgram.length) {
    state.colorProgram.pop()
  }
  save();
}
