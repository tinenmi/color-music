import state from '../state'
import {readObject, writeObjectDeffered} from '../state-in-file'
const filename = "./isSmoothly.json"

readObject({filename})
.then(({value})=>{
  state.isSmoothly = value
})

export const isSmoothly = () => ({value: state.isSmoothly})

export const smoothly = () => {
  state.isSmoothly = true
  writeObjectDeffered({filename, object: { value: state.isSmoothly}});
  return isSmoothly()
}

export const noSmoothly = () => {
  state.isSmoothly = false
  writeObjectDeffered({filename, object: { value: state.isSmoothly}});
  return isSmoothly()
}
