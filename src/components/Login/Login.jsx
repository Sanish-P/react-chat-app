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
    <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui image header">
          <div className="content">
            Log-in to your account
          </div>
        </h2>
        <Form handleLogin={handleLogin}/>
      </div>
    </div>
  )
}



export default Login;
