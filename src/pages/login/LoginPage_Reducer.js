import { RECEIVE_USER, REQUEST_USER, FAIL_USER } from './LoginPage_Action';

var userData = '';
if(JSON.parse(localStorage.getItem('keycloakToken')) !== null) {
  let d = JSON.parse(localStorage.getItem('userprofile'));
  console.log('d', d);
  userData = d;
} else {
  userData = ''
}


const initialState = {
  isFetching: false,
  error: '',
  data: userData,
  // isAuthenticated: false
  isAuthenticated: false
};

export function authReducer(state = initialState, payload) {
  switch (payload.type) {
    case RECEIVE_USER:
      return {
        ...state,
        data: payload.data,
        isAuthenticated: true,
        isFetching: false
      };
    case REQUEST_USER:
      return { ...state, isFetching: true, isAuthenticated: false };
    case FAIL_USER:
      return { ...state, isFetching: false };
      case "PREFERENCES_SET":
      return { ...state, data: payload.data };
    default:
      return state;
  }
}
