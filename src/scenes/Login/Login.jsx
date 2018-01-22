// @flow

import React from 'react';
import axios from 'src/utils/axios';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import type { RouterHistory } from 'react-router-dom';

type Props = {
  history: RouterHistory
};

const Login = (props: Props) => {
  const checkLoggedIn = () => {
    typeof window.sessionStorage.getItem('access_token') === 'string' &&
      props.history.push('/lets-chat');
  };
  const init = () => {
    checkLoggedIn();
  };
  init();
  const handleLogin = ({ email, password }, callback) => {
    let reqData = {
      grant_type: 'password',
      email,
      password
    };
    axios
      .post('/auth/token', reqData)
      .then(({ data }) => {
        window.sessionStorage.setItem('access_token', data.access_token);
        window.sessionStorage.setItem('refresh_token', data.refresh_token);
        axios.get('/user/me').then(({ data }) => {
          window.sessionStorage.setItem('user_id', data.user_id);
          props.history.push('/lets-chat');
        });
      })
      .catch(err => {
        callback({ responseError: 'Email or password might be incorrect' });
      });
  };
  return (
    <div className="ui center aligned three column grid">
      <div className="row" />
      <div className="column">
        <div className="ui raised segment">
          <div className="ui vertical item">
            <h2 className="header item">Log-in to your account</h2>
          </div>
          <LoginForm handleLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default Login;
