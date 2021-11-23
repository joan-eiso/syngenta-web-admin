import { call, take, put, all } from "redux-saga/effects";

import { LOGIN_REQUESTED, onLoginSuccess, onLoginFailure, SEND_PWD_RECOVERY_CODE_REQUESTED, onSendPwdRecoveryCodeSuccess, onSendPwdRecoveryCodeFailure, VERIFY_PWD_RECOVERY_CODE_REQUESTED, onVerifyPwdRecoveryCodeFailure, onVerifyPwdRecoveryCodeSuccess, RESTORE_PWD_REQUESTED, onRestorePwdSuccess, resetPwdRecoveryStatus, onRestorePwdFailure } from "./duck";
import { requestLogin, requestRestorePwd, requestSendRecoveryPwdCode, requestVerifyRecoveryPwdCode } from "./request";

function* authenticate() {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUESTED);
    const { data: { token, message: error } } = yield call(requestLogin, email, password);
    if(token) yield put(onLoginSuccess(token, email));
    else yield put(onLoginFailure(error));
  }
}

function* recoverPassword() {
  try {
    while (true) {
      const { email } = yield take(SEND_PWD_RECOVERY_CODE_REQUESTED);
      const { data: { statusCode, response: error } } = yield call(requestSendRecoveryPwdCode, email);
      
      if(statusCode === 200) {
        yield put(onSendPwdRecoveryCodeSuccess());
        const { code } = yield take(VERIFY_PWD_RECOVERY_CODE_REQUESTED);
        const { data: { statusCode, message: error } } = yield call(requestVerifyRecoveryPwdCode, email, code);
  
        if(statusCode === 200) {
          yield put(onVerifyPwdRecoveryCodeSuccess());
          const { newPassword } = yield take(RESTORE_PWD_REQUESTED);
          const { data: { statusCode, message: error } } = yield call(requestRestorePwd, email, newPassword, code);
          
          if(statusCode === 200) {
            yield put(onRestorePwdSuccess());
            yield put(resetPwdRecoveryStatus());
          }
          else yield put(onRestorePwdFailure(error));
        }
        else yield put(onVerifyPwdRecoveryCodeFailure(error));
      }
      else yield put(onSendPwdRecoveryCodeFailure(error));
    }
  } catch (error) {
    yield put(resetPwdRecoveryStatus());
  }
}

export default function* watcherSaga() {
  yield all([
    authenticate(),
    recoverPassword()
  ]);
}