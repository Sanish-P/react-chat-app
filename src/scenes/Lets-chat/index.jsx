// @flow

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'src/utils/axios';

const LetsChat = () => {
  const testToken = () => {
    axios
      .get('/super-secret-resource')
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  testToken();
  return (
    <div>
      <h1>This is where chat happens...</h1>
    </div>
  );
};

export default LetsChat;
