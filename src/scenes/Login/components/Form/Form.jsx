import React, { Component } from 'react'

class Form extends Component {
  state = {
    username: '',
    password: ''
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleFormSumit = (event) => {
    event.preventDefault();
    let loginData = {...this.state};
    this.props.handleLogin(loginData);
  }
  render () {
    return (
      <form className="ui large form" onSubmit={this.handleFormSumit}>
        <div className="ui stacked segment">
          <div className="field">
            <div className="ui left icon input">
              <i className="user icon" />
              <input type="text" name="username" placeholder="User name" value={this.state.username} onChange={this.handleChange}/>
            </div>
          </div>
          <div className="field">
            <div className="ui left icon input">
              <i className="icon lock" />
              <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
            </div>
          </div>
          <button className="ui fluid large teal submit button" type="submit">Login</button>
        </div>
      </form>
    )
  }
}
export default Form;
