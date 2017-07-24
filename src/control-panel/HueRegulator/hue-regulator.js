import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'

import {relative, getWidth} from '../../common/dimentions.js'
import {formatHue} from '../../common/colors.js'

import './hue-regulator.css'

const PADDING = 22;

export default class HueRegulator extends PureComponent {

  onTap = (e) => {
    const {setHue} = this.props
    const pointer = e.pointers[0]
    setHue({newValue: relative(0, pointer.clientX - PADDING, getWidth(pointer.target))})
  }

  render() {
    const {hue} = this.props
    return (
      <Hammer onTap={this.onTap} onPan={this.onTap}>
        <div className="hue-regulator">
          <div className="line">
            <div className="handle"
              style={{left: `${hue * 100}%`, backgroundColor: formatHue(hue)}}
            >
            </div>
          </div>
        </div>
      </Hammer>
    )
  }
}

HueRegulator.propTypes = {
  hue: PropTypes.number.isRequired,
  setHue: PropTypes.func.isRequired
}
