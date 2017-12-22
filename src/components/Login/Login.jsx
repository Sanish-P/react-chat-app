import React from 'react';
import Form from '../Form/Form.jsx';

const Login = () => {
  return (
    <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui image header">
          <div className="content">
            Log-in to your account
          </div>
        </h2>
        <Form />
      </div>
    </div>
  )
}

export default Login;
