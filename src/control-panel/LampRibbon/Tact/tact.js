import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import TactCell from '../TactCell'

import './tact.css'

const TactTopPadding = () => (<div className="top-padding"></div>)

const TactItem = ({selectCell}) => (cell, cellIndex) =>
  (<TactCell key={cellIndex} cell={cell} selectCell={selectCell(cellIndex)} />)

class Tact extends PureComponent {
  constructor() {
    super()
  }

  render() {
    const {active, title, cells, selectCell} = this.props
    const tactLineItemViews = cells.map(TactItem({selectCell}));
    return (
     <div className="tact">
       <div className={"line " + (active ? "active" : "")}>
         {(title % 4 == 0) && <span className="title">{title / 4 + 1}</span>}
         <div className="top-tint" />
         {active && <div className="tint" />}
         <TactTopPadding/>
         {tactLineItemViews}
       </div>
     </div>
    )
  }
}

Tact.propTypes = {
  title: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired,
  active: PropTypes.bool.isRequired,
  selectCell: PropTypes.func.isRequired
}

export default Tact
