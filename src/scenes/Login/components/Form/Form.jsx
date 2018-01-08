import React, { Component } from "react";

class Form extends Component {
  state = {
    credentials: {
      email: "",
      password: ""
    },
    error: {
      email: "",
      password: ""
    }
  };
  handleChange = event => {
    let credentials = {...this.state.credentials};
    credentials[event.target.name] = event.target.value;
    this.setState({
      credentials
    });
  };
  handleFormSumit = event => {
    event.preventDefault();
    let loginData = { ...this.state };
    this.validateForm(loginData);
    // this.props.handleLogin(loginData);
  };
  validateForm = (loginData) => {
    const error = {};
    const validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmailRegex.test(loginData.credentials.email)) {
      error.email = 'Email is invalid';
      this.setState({ error });
    }
    else {
      error.email = '';
    }
    if (loginData.credentials.password.length < 6) {
      error.password = 'Password should be greater than 6 characters';
      this.setState({ error });
    } else {
      error.password = '';
    }
  }
  render() {
    let emailClassName = '';
    let passwordClassName = '';
    this.state.error.email && (emailClassName = 'error')
    this.state.error.password && (passwordClassName = 'error')
    return (
      <div>
        <form className="ui large form" onSubmit={this.handleFormSumit}>
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
          <button className="ui fluid blue submit button" type="submit">Login</button>
        </form>
        <div className="ui error message">
          <ul className="list">
            <li>{this.state.error.email}</li>
            <li>{this.state.error.password}</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Form;
