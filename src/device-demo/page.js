import React, { Component } from 'react';

import api from '../common/api-client.js'
import {formatColor} from '../common/colors.js'

import './page.css';

export default class Page extends Component {
  constructor() {
    super()
    this.state = {lamps: [
      {red: 0, green: 0, blue: 0},
      {red: 0, green: 0, blue: 0},
      {red: 0, green: 0, blue: 0},
      {red: 0, green: 0, blue: 0}
    ]}
  }

  componentWillMount() {
    if (typeof(window) === 'undefined')
      return


    api.colorStream()
    .then((data)=>{
      this.setState({lamps: data.value.colors})
    });
  }

  render() {
    const {lamps} = this.state
    const lamps_view = lamps.map((l, index)=>(
      <div key={index} className="lamp"
        style={{backgroundColor: formatColor(l)}} />
    ))
    return (
      <div className="lamp-list">
        {lamps_view}
      </div>
    );
  }
}
