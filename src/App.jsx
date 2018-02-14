// @flow

import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './scenes/Login/';
import LetsChat from './scenes/Lets-chat';
import history from 'src/utils/history';
import PrivateRoute from 'src/components/PrivateRoute';
import store from 'src/store';
import favicon from 'public/assets/img/redux.ico';

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/lets-chat" component={PrivateRoute(LetsChat)} />
        <Route component={() => <h1>404</h1>} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
