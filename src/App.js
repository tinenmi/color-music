import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Redirect from 'react-router-dom/Redirect';
import ControlPanel from './control-panel';
import DeviceDemo from './device-demo';
import './index.css'
import './App.css';

const App = () =>
  <Switch>
    <Route path="/control-panel" component={ControlPanel} />
    <Route path="/device-demo" component={DeviceDemo} />
    <Redirect to="control-panel"/>
  </Switch>;

export default App;
