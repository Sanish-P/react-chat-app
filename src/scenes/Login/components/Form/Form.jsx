import React, { Component } from "react";

class Form extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = event => {

    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleFormSumit = event => {
    event.preventDefault();
    let loginData = { ...this.state };
    this.validateForm(loginData);
    // this.props.handleLogin(loginData);
  };
  validateForm = (loginData) => {
    const validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(validEmailRegex.test(loginData.email));
  }
  render() {
    return (
      <form className="ui large form" onSubmit={this.handleFormSumit}>
        <div className="field">
          <div className="ui left icon input">
            <i className="user icon" />
            <input
              type="text"
              name="email"
              placeholder="User email"
              value={this.state.useremail}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="ui left icon input">
            <i className="icon lock" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <button className="ui fluid blue submit button" type="submit">Login</button>
      </form>
    );
  }
}
export default Form;
