import { take, call, put, all } from "redux-saga/effects";
import { encodePayload } from '../../utils/jwt.util';
import { requestLicenses } from "./request";

import { FETCH_LICENSES_REQUESTED, onFetchLicensesSuccess, onFetchLicensesFailure } from './duck';

export function* fetchProducers() {
  while(true) {
    try {
      const {token, distAuth} = yield take(FETCH_LICENSES_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { licencias } } = yield call(requestLicenses, encodedPayload);
      
      let licenses = licencias.map((license) => ({
        id: license.IDLicencia,
        hash: license.hashLicencia,
        propertyId: license.IDPredio,
        date: license.fechaLicencia,
        creationDate: license.fechaRegistro,
        hybrids: undefined,
        bags: undefined,
      }));
      yield put(onFetchLicensesSuccess(licenses));
    } catch (error) {
      yield put(onFetchLicensesFailure(error));
    }
  }
}

export default function* watcherSaga() {
  yield all([
    fetchProducers()
  ]);
}