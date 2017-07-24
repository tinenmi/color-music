import React, { Component } from 'react';
import './page.css';

export default class Page extends Component {
  render() {
    const lamp = ['', '', '', '']
    const lamps_view = lamp.map(()=>(<div className="lamp"></div>))
    return (
      <div className="lamp-list">
        {lamps_view}
      </div>
    );
  }
}
