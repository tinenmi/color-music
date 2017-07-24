import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import HueRegulator from '../HueRegulator'
import ChromaticityRegulator from '../ChromaticityRegulator'

import './hsv-regulator.css'

class HsvRegulator extends PureComponent {

  setHue = ({newValue})=> {
    const {hsvColor, setHsvColor} = this.props
    const {saturation, value} = hsvColor

    setHsvColor({newValue: {
      hue: newValue, saturation, value
    }})
  }

  setSaturationValue = ({newValue: {saturation, value}})=> {
    const {hsvColor, setHsvColor} = this.props
    const {hue} = hsvColor
    setHsvColor({newValue: {
      hue, saturation, value
    }})
  }

  render() {
    const {hsvColor} = this.props
    const {hue, saturation, value} = hsvColor
    return (
      <div className="hsl-regulator">
        <HueRegulator hue={hue}
                      setHue={this.setHue} />
        <ChromaticityRegulator hue={hue}
                              _value={{saturation, value}}
                              setValue={this.setSaturationValue}/>
      </div>
    )
  }
}

HsvRegulator.propTypes = {
  hsvColor: PropTypes.object.isRequired,
  setHsvColor: PropTypes.func.isRequired
}

export default HsvRegulator
