const PATHS = {
    colorProgram: '/color-program',
    colorProgramCell: '/color-program-cell',
    cursor: '/cursor',
    colors: '/colors',
    isRunning: '/is-running',
    start: '/start',
    pause: '/pause',
    isSmoothly: '/is-smoothly',
    smoothly: '/smoothly',
    noSmoothly: '/no-smoothly',
    speed: '/speed',
    changeSize: '/change-size',
    get: function(name){
      if (typeof(this[name]) === 'undefined')
        throw new Error("Hasn't path " + name)
      return this[name];
    }
}

module.exports = (name) => (PATHS.get(name));
