import state from '../state'
import {readObject, writeObjectDeffered} from '../state-in-file'
const filename = "./speed.json"

readObject({filename}).then(({value})=>{
  state.speed = value
})

export const getSpeed = () => ({value: state.speed})

export const setSpeed = (reqbody) => {
  state.speed = Math.min(reqbody.newValue,300)
  writeObjectDeffered({filename, object: { value: state.speed}})
  return getSpeed()
}
