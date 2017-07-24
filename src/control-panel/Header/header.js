import React from 'react'
import PropTypes from 'prop-types'

import ToggleButton from './ToggleButton'
import UpDown from './UpDown'

import './header.css'

import play from './media/play.svg'
import pause from './media/pause.svg'
import magick from './media/magick.svg'
import magick_active from './media/magick_active.svg'
import sharp from './media/sharp.svg'
import smooth from './media/smooth.svg'

const Header = (props) => {
   const {isMagick, setMagick} = props
   const {isPlayed, setPlayed} = props
   const {isSmoothly, setSmoothly} = props
   const {speed, setSpeed} = props
   return (
      <div className="toolbox">
        <ToggleButton icon={play} checkedIcon={pause}
                      checked={isPlayed} setChecked={setPlayed}/>
        <div className="stretch"></div>
        <ToggleButton icon={sharp} checkedIcon={smooth}
                      checked={isSmoothly} setChecked={setSmoothly}/>
        <ToggleButton icon={magick} checkedIcon={magick_active}
                      checked={isMagick} setChecked={setMagick}/>
        <UpDown value={speed} setValue={setSpeed}/>
      </div>
   )
}

Header.propTypes = {
  isPlayed: PropTypes.bool.isRequired,
  isSmoothly: PropTypes.bool.isRequired,
  isMagick: PropTypes.bool.isRequired,
  speed: PropTypes.string.isRequired,
}

export default Header;
