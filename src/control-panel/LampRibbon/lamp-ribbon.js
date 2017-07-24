import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Tact from './Tact'
import TactPadding from './TactPadding'
import HorizontallScrollbar from '../HorizontalScrollbar'

import "./lamp-ribbon.css"

const LampRibbonItem = ({selectCell}) => (tact, tactIndex) =>
  (
    <Tact key = {tactIndex}
          title = {tactIndex}
          active = {tact.active}
          cells = {tact.cells}
          selectCell = {selectCell(tactIndex)}
          lampCount = {4} />
  )

export default class LampRibbon extends PureComponent {
  render() {
    const {colorProgram, selectCell, onScroll} = this.props
    const lampRibbonItemViews = colorProgram.map(LampRibbonItem({selectCell}));

    return <div className="lamp-ribbon">
      <HorizontallScrollbar onScroll={onScroll}>
        <TactPadding lampCount={4} />
        {lampRibbonItemViews}
        <TactPadding lampCount={4} right/>
      </HorizontallScrollbar>
    </div>
  }
}

LampRibbon.propTypes = {
  colorProgram: PropTypes.array.isRequired,
  onScroll: PropTypes.func.isRequired
}
