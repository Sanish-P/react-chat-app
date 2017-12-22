import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

const renderApp = () => {
  render(<App />, document.getElementById('app'));
}
renderApp();
