import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './scenes/Login/Login.jsx';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route component={() => (<h1>404</h1>)} />
    </Switch>
  </BrowserRouter>
)


export default App;
