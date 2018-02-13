// @flow

import React from 'react';
import { render } from 'react-dom';
import '../public/css/App.css';
import App from './App.jsx';

const renderApp = () => {
  console.log('check for reload!!!');
  const appDiv = document.getElementById('app');
  if (appDiv) {
    render(<App />, appDiv);
  } else {
    throw new Error('No element with id app');
  }
};
renderApp();
