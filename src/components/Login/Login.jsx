import React from 'react';
import { post } from 'axios';
import Form from '../Form/Form.jsx';

const handleLogin = (loginData) => {
  post('http://localhost:3000/login', loginData)
  .then(({data}) => {
    window.sessionStorage.setItem("access_token", data.access_token);
  })
  .catch((err) => {
    console.log(err);
  })
}

const Login = () => {
  return (
    <div className="ui segment">
      <h2 className="ui image header">
        <div className="content">
          Log-in to your account
        </div>
      </h2>
      <div className="ui one column middle stackable grid">
          <div className="column">
            <Form handleLogin={handleLogin}/>
          </div>
          <div className="ui horizontal divider column">
            Or
          </div>
          <div className="center aligned column">
            <div className="ui teal labeled icon button">
              <i className="signup icon"></i>
              Sign Up
            </div>
          </div>
      </div>
    </div>
  )
}



export default Login;
