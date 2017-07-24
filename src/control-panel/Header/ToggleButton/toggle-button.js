import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Button from  '../Button'

export default class ToggleButton extends PureComponent {

  onClick = () => {
    const {checked, setChecked} = this.props;
    setChecked({newValue: !checked})
  }

  render() {
    const {checked, icon, checkedIcon} = this.props;
    return (
      <Button onClick={this.onClick} icon={checked ? checkedIcon : icon} />
    )
  }
}

ToggleButton.propTypes = {
  icon: PropTypes.string.isRequired,
  checkedIcon: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired
};
