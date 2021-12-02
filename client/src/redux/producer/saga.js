import { take, call, put, all } from "redux-saga/effects";
import { encodePayload } from '../../utils/jwt.util';
import { requestProducers } from "./request";

import { FETCH_PRODUCERS_REQUESTED, onFetchProducersSuccess, onFetchProducersFailure } from './duck';

function* fetchProducers() {
  while(true) {
    try {
      const { token, distAuth } = yield take(FETCH_PRODUCERS_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { productores } } = yield call(requestProducers, encodedPayload);
      
      let producers = productores.map((productor) => ({
        id: productor.IDProductor,
        hash: productor.hashProductor,
        identification: productor.identificacionProductor,
        name: productor.nombreProductor,
        address: productor.direccionProductor,
        phone: productor.telefonoProductor,
        email: productor.emailProductor,
        creationDate: productor.fechaRegistro,
        propertyQuantity: productor.numeroPredios ?? 0,
        isClient: false,
        isFormerClient: false,
      }));
      yield put(onFetchProducersSuccess(producers));
    } catch (error) {
      yield put(onFetchProducersFailure(error));
    }
  }
}

export default function* watcherSaga() {
  yield all([
    fetchProducers()
  ]);
}