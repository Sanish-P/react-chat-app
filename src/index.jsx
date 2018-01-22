// @flow

import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

const renderApp = () => {
  const appDiv = document.getElementById('app');
  if (appDiv) {
    render(<App />, appDiv);
  } else {
    throw new Error('No element with id app');
  }
};
renderApp();
