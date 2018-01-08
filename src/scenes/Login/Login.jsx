import React from 'react';
import { post } from 'axios';
import Form from './components/Form/Form.jsx';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`


const Login = (props) => {
  const handleLogin = (loginData) => {
    post('http://localhost:3000/login', loginData)
    .then(({data}) => {
      window.sessionStorage.setItem("access_token", data.access_token);
      props.history.push('/lets-chat');
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return (
    <Wrapper>
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
    </Wrapper>
  )
}



export default Login;
