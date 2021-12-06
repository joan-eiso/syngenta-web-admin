import { take, call, put, select, takeEvery, all } from "redux-saga/effects";
import { encodePayload } from '../../utils/jwt.util';
import { requestFetchProperties } from "./request";

import { FETCH_PROPERTIES_REQUESTED, onFetchPropertiesSuccess, onFetchPropertiesFailure, NOTIFY_CLIENT } from './duck';
import { setProducerAsClient } from "../producer/duck";

import { changeDateFormat, parseMonth } from "../../utils/date.util";

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
        let date = predio.fechaRegistro.split(" ")[0];
        date = changeDateFormat(date);
        date = new Date(date);
        let year = date.getFullYear();
        let month = date.getMonth();
        let parsedMonth = parseMonth(month);
        let parsedHectares = parseInt(predio.hectareas);
        hectareCount += parsedHectares;
        return {
          id: predio.IDPredio,
          name: predio.vereda,
          date: date,
          year: year,
          month: parsedMonth,
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
  let licenseYear = action.licenseYear;
  let currentCampaign = yield select(state => state.campaign.currentCampaign);
  let properties = yield select(state => state.property.properties);
  let property = properties.find((property) => property.id === propertyId);

  if(licenseYear === currentCampaign) {
    yield put(setProducerAsClient(property.producerId, { isFormerClient: false }));
  } else if(licenseYear === currentCampaign - 1) {
    yield put(setProducerAsClient(property.producerId, { isFormerClient: true }));
  }
}

export default function* watcherSaga() {
  yield all([
    fetchProperties(),
    takeEvery(NOTIFY_CLIENT, notifyClient)
  ]);
}