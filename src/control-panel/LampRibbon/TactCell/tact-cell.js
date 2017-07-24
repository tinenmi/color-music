import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Tappable from 'react-tappable';
import {formatColor} from '../../../common/colors.js'

import './tact-cell.css'

export default class TactCell extends PureComponent {

  onTap = () => {
    const {selectCell} = this.props
    selectCell()
  }

  render() {
    const {cell} = this.props
    const {color, selected} = cell;
    return (
      <div className={"cell " + (selected ? "selected" : "")}>
        <Tappable onTap={this.onTap}>
          <div className="color"
            style={{
              backgroundColor: formatColor(color, 1),
              boxShadow: `0 0 17px 0 ${formatColor(color, 0.8)}`
            }}
            >
          </div>
        </Tappable>
      </div>
    )
  }
}

TactCell.propTypes = {
  cell: PropTypes.object.isRequired,
  selectCell: PropTypes.func.isRequired,
}
