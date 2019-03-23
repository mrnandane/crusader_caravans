export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const FAIL_USER = 'FAIL_USER';

export const fetchUser = email => {
  return {
    type: REQUEST_USER,
    email
  };
};
export const receiveUserAction = data => {
  return { type: RECEIVE_USER, data };
};

export const userLoginFailure = err => {
  console.log('err  receiveUser', err);
};
export const setKeycloakObj = data => {
  return {
    type: 'SET',
    data
  };
};