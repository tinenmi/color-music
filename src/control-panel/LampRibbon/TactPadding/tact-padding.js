import React from 'react'
import PropTypes from 'prop-types'

import times from 'lodash/times'

import './tact-padding.css'

const TactPadding = ({lampCount, right}) => (
    <div>
      <div className="padding-header"></div>
      {times(lampCount, (index)=>(<div key={index} className={"padding-row " +(right? "right": "")}></div>))}
    </div>
)


TactPadding.propTypes = {
  lampCount: PropTypes.number.isRequired,
  right: PropTypes.boolean
}

export default TactPadding
