import { CLIENT_SET, CLIENT_UNSET, PERFORM_LOGIN } from 'src/constants';

const clientReducer = (
  state = {
    user_id: '',
  },
  action
) => {
  switch (action.type) {
    case CLIENT_SET:
      return { user_id: action.payload.user_id };
    case CLIENT_UNSET:
      return { id: null, accessToken: null };
    default:
      return state;
  }
};

export default clientReducer;
