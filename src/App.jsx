// @flow

import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Login from './scenes/Login/Login.jsx';
import LetsChat from './scenes/Lets-chat/Lets-chat.jsx';
import history from 'src/utils/history.js';
import PrivateRoute from 'src/components/PrivateRoute/PrivateRoute.jsx';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/lets-chat" component={PrivateRoute(LetsChat)} />
      <Route component={() => <h1>404</h1>} />
    </Switch>
  </Router>
);

export default App;
