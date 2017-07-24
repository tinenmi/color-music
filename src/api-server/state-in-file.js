import fs from 'fs'
import path from 'path'

export const writeFilePromise = ({filename, text}) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname , filename), text, (err) => {
        if(err) {
            reject(err);
            return
        }
        resolve();
    });
  })
}

export const readFilePromise = ({filename}) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname , filename), 'utf-8', function (err,data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data)
    });
  })
}

export const writeObject = ({filename, object}) => {
  return writeFilePromise({filename, text: JSON.stringify(object)})
}

export const readObject = ({filename}) => {
  return readFilePromise({filename})
         .then((data)=>JSON.parse(data))
}

let defferedTimeout = null;
export const writeObjectDeffered = ({filename, object}) => {
  return new Promise((resolve, reject) => {
    if (defferedTimeout != null) {
      clearTimeout(defferedTimeout)
    }
    defferedTimeout = setTimeout(()=>{
      const writePromise = writeFilePromise({filename, text: JSON.stringify(object)})
      resolve(writePromise)
    }, 1000)
  });
}
