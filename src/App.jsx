import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './scenes/Login/Login.jsx';

const App = () => {
  return (
    <Switch>
      <Route exact path= '/login' component = {Login} />
    </Switch>
  )
}


export default App;
