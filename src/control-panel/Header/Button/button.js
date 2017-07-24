import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Hammer from 'react-hammerjs';

import './button.css'

export default class Button extends PureComponent {

  constructor() {
    super()
    this.timer = null
  }

  onTap = () => {
    const {onClick} = this.props
    onClick()
  }

  onPress = () => {
    this.timer = setInterval(()=> {
      clearInterval(this.timer)
      this.timer = setInterval(this.timerFunc, 50)
    }, 200)
  }

  timerFunc = () => {
    const {onClick} = this.props
    onClick();
  }

  onPressUp = () => {
    clearInterval(this.timer)
  }


  render() {
    const {icon, width} = this.props;
    return (
      <Hammer onTap={this.onTap} onPress={this.onPress} onPressUp={this.onPressUp}>
        <div
          className="button" style={{width}}>
          <span className="icon" style={{backgroundImage: `url(${icon})`}}></span>
        </div>
      </Hammer>
    )
  }
}

Button.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  repeatClicks: PropTypes.bool,
  width: PropTypes.string
};
