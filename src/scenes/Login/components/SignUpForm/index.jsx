import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

class SignUpForm extends Component {
  render() {
    const options = [
      { key: 1, text: 'Male', value: 1 },
      { key: 2, text: 'Female', value: 2 }
    ];
    return (
      <div>
        <div className="ui vertical item">
          <h2 className="header item">Join the Fun</h2>
        </div>
        <form className="ui form">
          <div className="two fields">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon" />
                <input type="text" placeholder="First Name" />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon" />
                <input type="text" placeholder="Last Name" />
              </div>
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <div className="ui left icon input">
                <i className="mail icon" />
                <input type="text" placeholder="Email" />
              </div>
            </div>
            <div className="field">
              <Dropdown
                selection
                search
                placeholder="Gender"
                options={options}
              />
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon" />
                <input type="password" placeholder="Password" />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon" />
                <input type="password" placeholder="Confirm  password" />
              </div>
            </div>
          </div>
          <button className="ui fluid purple submit button" type="submit">
            Let's Chat
          </button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
