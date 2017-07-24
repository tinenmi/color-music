import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import './horizontal-scrollbar.css'

export default class HorizontallScrollbar extends PureComponent {

  constructor() {
    super()
    this.content = null
    this.scrollPosition = 0;
  }

  onSwipe = (e) => {
    const {onScroll} = this.props
    this.scrollPosition += e.deltaX
    this.scrollPosition = Math.min(0, this.scrollPosition)
    const startTactIndex = Math.floor(this.scrollPosition / 200)
    onScroll({startTactIndex})
    this.content.style.transform = `translateX(${this.scrollPosition}px)`
  }

  render() {
    const {children} = this.props
    return (
      <div className="horizontal-scrollbar">
        <div className="horizontal-scrollbar-content" ref={(content) => { this.content = content; }}>
          {children}
        </div>
      </div>
    )
  }
}

HorizontallScrollbar.propTypes = {
  onScroll: PropTypes.func.isRequired
}
