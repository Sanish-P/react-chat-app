import { CLIENT_SET, CLIENT_UNSET, PERFORM_LOGIN } from 'src/constants';

const clientReducer = (
  state = {
    access_token: '',
    refresh_token: ''
  },
  action
) => {
  switch (action.type) {
    case CLIENT_SET:
      return { access_token: action.payload.access_token, refresh_token: action.payload.refresh_token };
    case CLIENT_UNSET:
      return { id: null, accessToken: null };
    default:
      return state;
  }
};

export default clientReducer;
