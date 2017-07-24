import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import HsvRegulator from '../HsvRegulator'
import {Rgb2Hsv, Hsv2Rgb} from '../../common/colors.js'

export default class ColorRegulator extends PureComponent {

  constructor() {
    super();
    const defaultColor = {red: 0, green: 0, blue: 0}
    this.state = {...Rgb2Hsv(defaultColor), ...defaultColor}
  }

  changeColorState({red, green, blue}) {
    const {hue, saturation, value} = Rgb2Hsv({red, green, blue}, {defaultHue: this.state.hue})
    this.setState({hue, saturation, value, red, green, blue})
  }

  componentWillMount() {
    const { red, green, blue } = this.props.color
    this.changeColorState({ red, green, blue })
  }

  componentWillReceiveProps(nextProps) {
    const { red, green, blue } = nextProps.color
    if (this.state.red === red
      && this.state.green === green
      && this.state.blue === blue) {
      }
      else {
        this.changeColorState({red, green, blue })
      }
   }

   setHsvColor = ({newValue:{hue, saturation, value}}) => {
     const {setColor} = this.props
     const newValue = Hsv2Rgb({hue, saturation, value})

     this.setState({...newValue, hue, saturation, value}, ()=> {
       setColor({newValue})
     });
   }

  render() {
    const {hue, saturation, value} = this.state;
    return (<HsvRegulator hsvColor={{hue, saturation, value}} setHsvColor={this.setHsvColor} />)
  }
}

ColorRegulator.propTypes = {
  color: PropTypes.object.isRequired,
  setColor: PropTypes.func.isRequired
}
