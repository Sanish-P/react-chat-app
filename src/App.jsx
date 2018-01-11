import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './scenes/Login/Login.jsx';
import LetsChat from './scenes/Lets-chat/lets-chat.jsx';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/lets-chat" component={LetsChat} />
      <Route component={() => <h1>404</h1>} />
    </Switch>
  </BrowserRouter>
);

export default App;
