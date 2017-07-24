import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'

import {relative, getWidth, getHeight} from '../../common/dimentions.js'
import { formatHue, formatHsvColor} from '../../common/colors.js'

import './chromaticity-regulator.css'

const TOP_OFFSET = 389;

class SaturationValueRegulator extends PureComponent {

  onTap = (e) => {
    const {setValue} = this.props
    const pointer = e.changedPointers[0]
    setValue({newValue: {
      saturation: relative(0, pointer.clientX, getWidth(pointer.target)),
      value: 1 - relative(0, pointer.clientY - TOP_OFFSET, getHeight(pointer.target))
    }})
  }

  render() {
    const {hue, _value} = this.props
    const {saturation, value} = _value
    return (
      <Hammer onTap={this.onTap} onPan={this.onTap}>
        <div className="saturation-value-regulator" >
          <div className="layer mount"
               style={{backgroundColor: formatHue(hue)}}>
          </div>
          <div className="layer saturation-gradient"></div>
          <div className="layer lightness-gradient"></div>
          <div className="handle"
            style={{
              backgroundColor: formatHsvColor({hue, saturation, value}),
              left: `${saturation * 100}%`,
              top: `${(1 - value) * 100}%`
            }}>
          </div>
        </div>
      </Hammer>
    )
  }
}

SaturationValueRegulator.propTypes = {
  hue: PropTypes.number.isRequired,
  _value: PropTypes.object.isRequired
}

export default SaturationValueRegulator
