import { call, take, put, all } from "redux-saga/effects";

import { LOGIN_REQUESTED, onLoginSuccess, onLoginFailure, SEND_PWD_RECOVERY_CODE_REQUESTED, onSendPwdRecoveryCodeSuccess, onSendPwdRecoveryCodeFailure, VERIFY_PWD_RECOVERY_CODE_REQUESTED, onVerifyPwdRecoveryCodeFailure, onVerifyPwdRecoveryCodeSuccess, RESTORE_PWD_REQUESTED, onRestorePwdSuccess, resetPwdRecoveryStatus, onRestorePwdFailure } from "./duck";
import { fetchProducers } from "../producer/duck";
import { fetchProperties } from './../property/duck';
import { fetchLicenses } from './../license/duck';
import { fetchCrops, fetchTechnologies, fetchTechTraits } from "../product/duck";

import { requestLogin, requestRestorePwd, requestSendRecoveryPwdCode, requestVerifyRecoveryPwdCode } from "./request";

function* authenticate() {
  while (true) {
    try {
      const { email, password } = yield take(LOGIN_REQUESTED);
      const { data: { token, message: error } } = yield call(requestLogin, email, password);
      if(token) {
        yield call(loadData, token, email);
        yield put(onLoginSuccess(token, email));
      }
      else yield put(onLoginFailure(error));
      yield put(onLoginFailure(error));
    } catch (error) {
    }
  }
}

function* loadData(token, email) {
  try {
    yield put(fetchProducers(token, email));
    yield put(fetchProperties(token, email));
    yield put(fetchLicenses(token, email));
    yield put(fetchProducers(token, email));
    yield put(fetchCrops(token, email));
    yield put(fetchTechnologies(token, email));
    yield put(fetchTechTraits(token, email));
  } catch (error) {
    console.log("Load data error:", error);
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