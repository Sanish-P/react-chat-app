import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Form extends Component {
  render () {
    return (
      <form className="ui large form">
        <div className="ui stacked segment">
          <div className="field">
            <div className="ui left icon input">
              <i className="user icon" />
              <input type="text" name="user-name" placeholder="User name"/>
            </div>
          </div>
          <div className="field">
            <div className="ui left icon input">
              <i className="icon lock" />
              <input type="password" name="password" placeholder="Password"/>
            </div>
          </div>
          <button className="ui fluid large teal submit button" type="submit">Login</button>
        </div>
      </form>
    )
  }
}
export default Form;
