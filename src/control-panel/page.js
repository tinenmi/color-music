import React, { PureComponent } from 'react'
import immutable from 'object-path-immutable'

import Layout from './Layout'
import Header from './Header'
import LampRibbon from './LampRibbon'
import ColorRegulator from './ColorRegulator'
import initialState from './state-logick/initial-state.js'
import api from '../common/api-client.js'

import './page.css'

export default class Page extends PureComponent {

  constructor() {
    super()
    this.memoSelectCell = []
    this.counter = 0
  }

  onScroll = ({startTactIndex}) => {
  }

  componentWillMount() {
    this.setState(initialState)
    this.setState({colorProgram: []})
    api.colorProgram()
    .then((colorProgram)=> {
      const {tactIndex, cellIndex} = this.state.selected
      const {cursor} = this.state
      colorProgram[tactIndex].cells[cellIndex].selected = true
      colorProgram[cursor.tactIndex].active = true
      this.setState({
        colorProgram
      },
      () => {
        const selectedLampColor = this.getSelectedLampColor();
        this.setState({
          selectedLampColor
        });
      })
    }).then(()=>{
      this.colorProgramChangeSize()
      api.cursorStream()
      .then((newTactIndex)=>{
        console.log(newTactIndex)
        const {colorProgram} = this.state
        const {tactIndex} = this.state.cursor
        let newColorProgram = colorProgram;
        newColorProgram = immutable.set(newColorProgram,
          [tactIndex, 'active']
          , false
        )
        newColorProgram = immutable.set(newColorProgram,
          [newTactIndex, 'active']
          , true
        )
        this.setState({
          cursor: {tactIndex: newTactIndex},
          colorProgram: newColorProgram
        })
      })
    })

    api.speed()
    .then(({value})=> {
      this.setState({
        speed: Math.max(value, 0)
      })
    })

    api.isRunning()
    .then(({value})=> {
      this.setState({
        isPlayed: value
      })
    });

    api.isSmoothly()
    .then(({value})=> {
      this.setState({
        isSmoothly: value
      })
    });
  }

  almostBlack(color) {
    return color.red + color.green + color.blue < 64;
  }

  newLine() {
    return {
          active: false, cells: [
            {color: { red:0, green:0, blue: 0}, selected: false},
            {color: { red:0, green:0, blue: 0}, selected: false},
            {color: { red:0, green:0, blue: 0}, selected: false},
            {color: { red:0, green:0, blue: 0}, selected: false}
          ]
        }
  }

  colorProgramChangeSize() {
    this.counter++;
    let {colorProgram} = this.state
    let lastProgram = null
    let sizeDelta = 0;

    while(colorProgram.length > 0) {
      const lastTact = colorProgram[colorProgram.length-1]
      const lastCells = lastTact.cells
      const needReduce = lastCells.every((x) => ( this.almostBlack(x.color)))
      if (!needReduce) break;
      lastProgram = colorProgram
      colorProgram = colorProgram.slice(0, colorProgram.length-1)
    }
    if (lastProgram == null){
      colorProgram = colorProgram.concat([this.newLine()])
    } else {
      colorProgram = lastProgram
    }
    this.setState({
      colorProgram
    })
  }

  getMemoSelectCell = (tactIndex) => {
    if (typeof(this.memoSelectCell[tactIndex]) === 'undefined') {
      return this.memoSelectCell[tactIndex] = this.selectCell(tactIndex)
    }
    return this.memoSelectCell[tactIndex];
  }

  getSelectedLampColor() {
    const {colorProgram, selected} = this.state
    const {tactIndex, cellIndex} = selected;
    const selectedTact = colorProgram[tactIndex]
    const selectedCells = selectedTact.cells
    const selectedCell = selectedCells[cellIndex]
    const selectedLampColor = selectedCell.color
    return selectedLampColor;
  }

  selectCell = (tactIndex) => (cellIndex) => () => {
      const {colorProgram} = this.state
      const {isMagick, selected} = this.state
      let newColorProgram = immutable.set(colorProgram,
        [ selected.tactIndex, 'cells', selected.cellIndex, 'selected'],
        false
      )

      if (!isMagick) {
        newColorProgram = immutable.set(newColorProgram,
          [tactIndex, 'cells' , cellIndex, 'selected'],
          true
        )
      }
      else{
        const { magickColor} = this.state
        api.setColorProgramCell({
          tactIndex, cellIndex, newColor: magickColor
        })
        newColorProgram = immutable.set(newColorProgram,
          [tactIndex, 'cells', cellIndex],
          {selected: true, color: magickColor}
        )
      }

      this.setState({
        colorProgram: newColorProgram,
        selected: {tactIndex, cellIndex},
      }, ()=>{
        const selectedLampColor = this.getSelectedLampColor();
        this.setState({
          selectedLampColor
        });
        this.checkcolorProgramChangeSize(colorProgram, tactIndex)
      })
  }

  setPlayed = ({newValue}) => {
    this.setState({
      isPlayed: newValue
    })
    const apiRes = newValue
                 ? api.start()
                 : api.pause()
    apiRes.then(({value}) => {
      this.setState({
        isPlayed: value
      });
    })
  }

  setMagick = ({newValue}) => {
    const {selectedLampColor} = this.state
    this.setState({
      isMagick: newValue,
      magickColor: selectedLampColor
    })
  }

  setSmoothly = ({newValue}) => {
    this.setState({
      isSmoothly: newValue
    });
    const apiRes = newValue
                 ? api.smoothly()
                 : api.noSmoothly()
    apiRes.then(({value})=> {
      this.setState({
        isSmoothly: value
      });
    })
  }

  setSpeed = ({newValue}) => {
    this.setState({
      speed: Math.min(Math.max(newValue, 0), 300)
    });
    api.setSpeed({newValue})
    .then(({value})=> {
      this.setState({
        speed: Math.min(Math.max(value, 0), 300)
      });
    })
  }

  checkcolorProgramChangeSize(colorProgram, tactIndex) {
    if (tactIndex >= colorProgram.length-2) {
      this.colorProgramChangeSize()
    }
  }

  setSelectedLampColor = ({newValue}) => {
    const {colorProgram, selected: {tactIndex, cellIndex}} = this.state
    const newColorProgram = immutable.set(colorProgram,
      [tactIndex, 'cells', cellIndex, 'color'],
      newValue
    )
    api.setColorProgramCell({
      tactIndex, cellIndex, newColor: newValue
    })
    this.setState({
      colorProgram: newColorProgram,
      selectedLampColor: newValue
    }, ()=> {
      this.checkcolorProgramChangeSize(colorProgram, tactIndex)
    });
  }

  render() {
    const {isPlayed, isSmoothly, isMagick, speed} = this.state
    const {colorProgram} = this.state
    const {selectedLampColor} = this.state

    const header = (
          <Header
            isPlayed={isPlayed} setPlayed={this.setPlayed}
            isSmoothly={isSmoothly} setSmoothly={this.setSmoothly}
            isMagick={isMagick} setMagick={this.setMagick}
            speed={speed + ""} setSpeed={this.setSpeed}
          />
        )

    return (
      <Layout header={header}>
        <LampRibbon colorProgram={colorProgram} selectCell={this.getMemoSelectCell}
                      onScroll = {this.onScroll}/>
        <ColorRegulator color={selectedLampColor} setColor={this.setSelectedLampColor}/>
      </Layout>
    )
  }
}
