import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

import './up-down.css'

import minus from './media/minus.svg'
import plus from './media/plus.svg'

export default class UpDown extends PureComponent {

   decrement = () => {
     const {value, setValue} = this.props
     setValue({newValue: parseInt(value) - 1})
   }

   increment = () => {
     const {value, setValue} = this.props
     setValue({newValue: parseInt(value) + 1})
   }

  render() {
    const {value} = this.props;
    return (
      <div className="updown">
        <Button onClick={this.decrement} icon={minus} width = "48px" repeatClicks/>
        <span className="value">{value}</span>
        <Button onClick={this.increment} icon={plus} width = "48px" repeatClicks/>
      </div>
    )
  }
}


UpDown.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired
}
