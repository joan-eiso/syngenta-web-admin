import { take, call, put, all } from "redux-saga/effects";
import { encodePayload } from '../../utils/jwt.util';
import { requestProducers } from "./request";

export function* fetchProducers() {
  while(true) {
    try {
      yield take("/producer/FETCH_PRODUCERS/REQUESTED");

      let payload = {
        dist_auth: "joansebastian35@gmail.com"
      }
      let encodedPayload = encodePayload(payload, "357b59296e205e34bbd8ea9655a9e3e3");
      let { data: { productores } } = yield call(requestProducers, encodedPayload);
      
      let producers = productores.map((productor) => ({
          id: productor.IDProductor,
          identification: productor.identificacionProductor,
          name: productor.nombreProductor,
          address: productor.direccionProductor,
          phone: productor.telefonoProductor,
          email: productor.emailProductor,
          creationDate: productor.fechaRegistro,
          propertyQuantity: productor.numeroPredios ?? 0,
          isClient: false,
      }));
      yield put({ type: "/producer/FETCH_PRODUCERS/SUCCESS", producers });
    } catch (error) {
      yield put({ type: "/producer/FETCH_PRODUCERS/FAILURE", error });
    }
  }
}

export default function* watcherSaga() {
  yield all([
    fetchProducers()
  ]);
}