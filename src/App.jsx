import React from 'react';
import Login from './components/Login/Login.jsx';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const App = () => {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  )
}


export default App;
