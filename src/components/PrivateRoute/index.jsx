import React from 'react';
import { Redirect } from 'react-router';

function PrivateRoute(WrappedComponent) {
  return props => {
    const checkAccessToken = () => {
      return typeof sessionStorage.getItem('access_token') === 'string';
    };
    if (checkAccessToken()) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  };
}

export default PrivateRoute;
