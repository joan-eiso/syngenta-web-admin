import { take, call, put, all } from "redux-saga/effects";
import { encodePayload } from '../../utils/jwt.util';
import { requestProperties } from "./request";

import { FETCH_PROPERTIES_REQUESTED, onFetchPropertiesSuccess, onFetchPropertiesFailure } from './duck';

export function* fetchProperties() {
  while(true) {
    try {
      const { token, distAuth } = yield take(FETCH_PROPERTIES_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { predios } } = yield call(requestProperties, encodedPayload);
      
      let properties = predios.map((predio) => {
        let parsedHectares = parseInt(predio.hectareas);
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
      yield put(onFetchPropertiesSuccess(properties));
    } catch (error) {
      yield put(onFetchPropertiesFailure(error));
    }
  }
}

export default function* watcherSaga() {
  yield all([
    fetchProperties()
  ]);
}