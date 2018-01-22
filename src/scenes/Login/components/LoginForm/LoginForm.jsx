// @flow

import React, { Component } from 'react';
import FormStyles from './LoginForm.css';

type Props = {
  handleLogin: Function
};

type Credentials = {
  email: string,
  password: string
};

type State = {
  credentials: Credentials,
  error: {
    email: string,
    password: string,
    responseError?: string
  }
};

class Form extends Component<Props, State> {
  state = {
    credentials: {
      email: '',
      password: ''
    },
    error: {
      email: '',
      password: ''
    }
  };
  handleChange = (
    event: {
      target: EventTarget & { name: string, value: string }
    } & SyntheticInputEvent<HTMLInputElement>
  ) => {
    let credentials = { ...this.state.credentials };
    credentials[event.target.name] = event.target.value;
    this.setState({
      credentials
    });
  };
  handleFormSumit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    let credentials = { ...this.state.credentials };
    this.validateForm(credentials) &&
      this.props.handleLogin(credentials, error => {
        this.setState({ error });
      });
  };
  validateForm = (credentials: Credentials) => {
    const error = {};
    const validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (credentials.email.length !== 0) {
      if (!validEmailRegex.test(credentials.email)) {
        error.email = 'Please enter valid email address';
      } else {
        error.email = '';
      }
    } else {
      error.email = 'Please enter your email address';
    }
    if (credentials.password.length !== 0) {
      if (credentials.password.length < 6) {
        error.password = 'Password should be greater than 6 characters';
      } else {
        error.password = '';
      }
    } else {
      error.password = 'Please enter a password';
    }
    this.setState({ error });
    return !error.email && !error.password;
  };
  render() {
    let emailClassName = '';
    let passwordClassName = '';
    let errorMessageClass = '';
    let currentErrors = [];
    if (this.state.error.email) {
      emailClassName = 'error';
      currentErrors.push(this.state.error.email);
    }
    if (this.state.error.password) {
      passwordClassName = 'error';
      currentErrors.push(this.state.error.password);
    }
    !(emailClassName || passwordClassName) &&
      (errorMessageClass = FormStyles.hide);
    if (this.state.error.responseError) {
      emailClassName = 'error';
      passwordClassName = 'error';
      errorMessageClass = '';
      currentErrors.push(this.state.error.responseError);
    }
    return (
      <div>
        <form className="ui form" onSubmit={this.handleFormSumit}>
          <div className={`field ${emailClassName}`}>
            <div className="ui left icon input">
              <i className="user icon" />
              <input
                type="text"
                name="email"
                placeholder="User email"
                value={this.state.credentials.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className={`field ${passwordClassName}`}>
            <div className="ui left icon input">
              <i className="icon lock" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.credentials.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button className="ui fluid blue submit button" type="submit">
            Login
          </button>
        </form>
        <div className={`ui error message ${errorMessageClass}`}>
          <ul className="list">
            {currentErrors.map(currentError => (
              <li key={currentError}>{currentError}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default Form;
