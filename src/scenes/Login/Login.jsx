// @flow

import React, { Component } from 'react';
import axios from 'src/utils/axios';
import type { RouterHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  TransitionGroup,
  CSSTransition,
  Transition
} from 'react-transition-group';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { loginRequest } from 'src/store/actionCreators/login';
import './Login.css';
import Dummy from 'src/components/Dummy';

class Landing extends Component<Props, State> {
  state = {
    newUser: true,
    items: ['hello']
  };
  checkLoggedIn = () => {
    typeof window.sessionStorage.getItem('access_token') === 'string' &&
      this.props.history.push('/lets-chat');
  };
  handleLogin = (
    { email, password }: { email: string, password: string },
    callback: Function
  ) => {
    let reqData = {
      grant_type: 'password',
      email,
      password
    };
    // axios
    //   .post('/auth/token', reqData)
    //   .then(({ data }) => {
    //     window.sessionStorage.setItem('access_token', data.access_token);
    //     window.sessionStorage.setItem('refresh_token', data.refresh_token);
    //     axios.get('/user/me').then(({ data }) => {
    //       window.sessionStorage.setItem('user_id', data.user_id);
    //       this.props.history.push('/lets-chat');
    //     });
    //   })
    //   .catch(err => {
    //     callback({ responseError: 'Email or password might be incorrect' });
    //   });
    new Promise((resolve, reject) => {
      this.props.loginRequest(reqData, resolve, reject);
    })
    .then(() => {
      this.props.history.push('/lets-chat');
    })
    .catch((e) => {
      console.log(e);
      callback({ responseError: 'Email or password might be incorrect' });
    })
  };
  handleLinkClick = (event: SyntheticMouseEvent<>) => {
    event.preventDefault();
    let newUser = this.state.newUser;
    this.setState({ newUser: !newUser });
  };
  componentWillMount() {
    this.checkLoggedIn();
  }
  render() {
    let FormComponent = null;
    let MessageComponent = null;
    if (this.state.newUser) {
      FormComponent = <SignUpForm />;
      MessageComponent = (
        <label>
          Already have an account? Login{' '}
          <a href="#" onClick={this.handleLinkClick}>
            here
          </a>
        </label>
      );
    } else {
      FormComponent = <LoginForm handleLogin={this.handleLogin} />;
      MessageComponent = (
        <label>
          Don't have an account yet? Sign Up{' '}
          <a href="#" onClick={this.handleLinkClick}>
            here
          </a>
        </label>
      );
    }
    return (
      <div className="ui center aligned three column grid">
        <div className="row">
          <Dummy />
        </div>
        <div className="column">
          <div className="ui raised segment">
            {FormComponent}
            {MessageComponent}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginRequest }, dispatch);
};

export const Unwrapped = Landing;
export default connect(null, mapDispatchToProps)(Landing);
