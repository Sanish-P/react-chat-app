import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { fetchProfile } from 'src/store/actionCreators/login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from  'src/components/Loader';

// class PrivateRoute extends React.Component {
//   render() {
//     return () {
//       let WrappedComponent = this.props.children;
//       console.log(WrappedComponent);
//       // return <WrappedComponent />;
//       return props => {
//         const checkAccessToken = () => {
//           return typeof sessionStorage.getItem('access_token') === 'string';
//         };
//         if (checkAccessToken()) {
//           return <WrappedComponent {...props} />;
//         } else {
//           return <Redirect to="/" />;
//         }
//       };
//     }
//   }
// }
// const PrivateRoute = (props) => {
//   state = {
//     authenticated: true
//   }
//   console.log(props);
//   const checkAccessToken = () => {
//     return typeof sessionStorage.getItem('access_token') === 'string';
//   }
//   if (checkAccessToken()) {
//     return props.children;
//   } else {
//     return <Redirect to="/" />
//   }
// }
class PrivateRoute extends Component {
  state = {
    authenticated: false
  }
  componentDidMount () {
    new Promise((resolve, reject) => {
      this.props.fetchProfile(resolve, reject);
    })
    .then(() => {
      this.setState({ authenticated: true });
    })
    .catch((err) => {
      console.log('err', err);
    })
  }
  checkAccessToken () {
    return typeof sessionStorage.getItem('access_token') === 'string';
  }
  render() {
    if (this.checkAccessToken()) {
      if (this.state.authenticated) {
        return this.props.children;
      } else {
        return <Loader />;
      }
    } else {
      return <Redirect to="/" />
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProfile }, dispatch);
}

export default connect(null, mapDispatchToProps) (PrivateRoute);
