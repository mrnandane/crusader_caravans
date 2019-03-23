import { call, put } from 'redux-saga/effects';

import { getUserDetails } from './LoginPage_Service';
import { receiveUserAction, userLoginFailure } from './LoginPage_Action';

export function* getUserDetailsSaga(action) {
  try {
    const info = yield call(getUserDetails, action.email);
    localStorage.setItem('userprofile', JSON.stringify(info));
    yield put(receiveUserAction(info));
  } catch (err) {
    yield put(userLoginFailure({error: 'failed to login'}));
  }
}
