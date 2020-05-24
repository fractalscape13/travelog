import React from 'react';
import './../App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Splash from './Splash'
import Log from './Log'

function App() {

  return (
      <Router>
          <Switch>
            <Route exact path="/" component={Splash} />
            <Route path="/log" component={Log} />
          </Switch>
      </Router>
  );
}

export default App;