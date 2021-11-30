import { take, call, put, select, takeEvery, all } from "redux-saga/effects";
import { encodePayload } from '../../utils/jwt.util';
import { requestFetchProperties } from "./request";

import { FETCH_PROPERTIES_REQUESTED, onFetchPropertiesSuccess, onFetchPropertiesFailure, NOTIFY_CLIENT } from './duck';
import { setProducerAsClient } from "../producer/duck";

function* fetchProperties() {
  while(true) {
    try {
      const { token, distAuth } = yield take(FETCH_PROPERTIES_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { predios } } = yield call(requestFetchProperties, encodedPayload);

      let hectareCount = 0;
      let properties = predios.map((predio) => {
        let parsedHectares = parseInt(predio.hectareas);
        hectareCount += parsedHectares;
        return {
          id: predio.IDPredio,
          name: predio.vereda,
          producerId: predio.IDProductor,
          countryId: predio.IDPais,
          departmentId: predio.IDDepartamento,
          cityId: predio.IDMunicipio,
          farm: predio.predioLote,
          subregionId: predio.IDSubregion,
          hectares: parsedHectares,
          lat: predio.latitud,
          long: predio.longitud,
          creationDate: predio.fechaRegistro,
          userId: predio.IDUsuario,
          producerHash: predio.hashProductor,
          propertyHash: predio.hashPredio,
        }
      });
      yield put(onFetchPropertiesSuccess(properties, hectareCount));
    } catch (error) {
      yield put(onFetchPropertiesFailure(error));
    }
  }
}

function* notifyClient(action) {
  let propertyId = action.propertyId;
  let properties = yield select(state => state.property.properties);
  let property = properties.find((property) => property.id === propertyId);

  yield put(setProducerAsClient(property.producerId));
}

export default function* watcherSaga() {
  yield all([
    fetchProperties(),
    takeEvery(NOTIFY_CLIENT, notifyClient)
  ]);
}