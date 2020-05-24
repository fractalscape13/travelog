import React from 'react';
import './../App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Splash from './Splash'
import Account from './Account'

function App() {

  return (
      <Router>
          <Switch>
            <Route exact path="/" component={Splash} />
            <Route path="/account" component={Account} />
          </Switch>
      </Router>
  );
}

export default App;