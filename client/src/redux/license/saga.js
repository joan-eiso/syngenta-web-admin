import { take, call, put, select, delay, all } from "redux-saga/effects";
import { encodePayload } from '../../utils/jwt.util';
import { requestDownloadLicense, requestFetchLicenses } from "./request";

import { FETCH_LICENSES_REQUESTED, onFetchLicensesSuccess, onFetchLicensesFailure, DOWNLOAD_LICENSE_REQUESTED, onDownloadLicenseSuccess, onDownloadLicenseFailure } from './duck';
import { notifyClient } from "../property/duck";

function* fetchLicenses() {
  while(true) {
    try {
      const {token, distAuth} = yield take(FETCH_LICENSES_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { licencias, statusCode, message: error } } = yield call(requestFetchLicenses, encodedPayload);
      
      let licenses = licencias.map((license) => ({
        id: license.IDLicencia,
        hash: license.hashLicencia,
        propertyId: license.IDPredio,
        date: license.fechaLicencia,
        creationDate: license.fechaRegistro,
        hybrids: undefined,
        bags: undefined,
      }));

      if(statusCode === 200) {
        yield put(onFetchLicensesSuccess(licenses));
        let fetchPropertiesSucceed = yield select(state => state.property.fetchPropertiesSucceed);

        while(!fetchPropertiesSucceed) {
          yield delay(100);
          fetchPropertiesSucceed = yield select(state => state.property.fetchPropertiesSucceed);
        }

        for (let license of licenses) {
          yield put(notifyClient(license.propertyId));
        }
      } 
      else yield put(onFetchLicensesFailure(error));
    } catch (error) {
      yield put(onFetchLicensesFailure(error));
    }
  }
}

function* downloadLicense() {
  while(true) {
    try {
      const { token, distAuth, licenseId, distEmail } = yield take(DOWNLOAD_LICENSE_REQUESTED);

      let payload = {
        dist_auth: distAuth,
        id_licencia: licenseId, 
        email_dist: distEmail
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { response, statusCode, message: error } } = yield call(requestDownloadLicense, encodedPayload);

      if(statusCode === 200) yield put(onDownloadLicenseSuccess(response));
      yield put(onDownloadLicenseFailure(error));
    } catch (error) {
      yield put(onDownloadLicenseFailure(error));
    }
  }
}

export default function* watcherSaga() {
  yield all([
    fetchLicenses(),
    downloadLicense()
  ]);
}