// @flow

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'src/utils/axios';

const LetsChat = (props) => {
  const testToken = () => {
    console.log('testToken called');
    let user = props.user_id ? props.user_id : 'no-user';
    axios
      .get(`/super-secret-resource/${user}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log('calling testToken');
  testToken();
  return (
    <div>
      <h1>This is where chat happens...</h1>
    </div>
  );
};

const mapStateToProps = state => ({ user_id: state.client.user_id })

export default connect(mapStateToProps, null)(LetsChat);
