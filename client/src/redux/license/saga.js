import { take, call, put, select, delay, all } from "redux-saga/effects";
import { encodePayload } from '../../utils/jwt.util';
import { requestDownloadLicense, requestFetchHybridsByLicenseId, requestFetchLicenses } from "./request";

import { FETCH_LICENSES_REQUESTED, onFetchLicensesSuccess, onFetchLicensesFailure, DOWNLOAD_LICENSE_REQUESTED, onDownloadLicenseSuccess, onDownloadLicenseFailure } from './duck';
import { notifyClient } from "../property/duck";
import { changeDateFormat, parseMonth } from "../../utils/date.util";

function* fetchLicenses() {
  while(true) {
    try {
      const { token, distAuth } = yield take(FETCH_LICENSES_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { licencias, statusCode, message: error } } = yield call(requestFetchLicenses, encodedPayload);
      
      let licenses = licencias.map((licencia) => {
        let date = changeDateFormat(licencia.fechaLicencia);
        let year = new Date(date).getFullYear();
        let month = new Date(date).getMonth();
        let parsedMonth = parseMonth(month);
        return {
          id: licencia.IDLicencia,
          hash: licencia.hashLicencia,
          propertyId: licencia.IDPredio,
          date: date,
          year: year,
          month: parsedMonth,
          creationDate: licencia.fechaRegistro,
          hybrids: undefined,
          bags: undefined,
        }
      });

      let soldBags = 0;
      for(let license of licenses) {
        const { hybrids, bagCount } = yield call(fetchHybridsByLicenseId, token, distAuth, license.id);
        license.hybrids = hybrids;
        license.bags = bagCount;
        soldBags += bagCount;
      }

      if(statusCode === 200) {
        yield put(onFetchLicensesSuccess(licenses, soldBags));
        let fetchPropertiesSucceed = yield select(state => state.property.fetchPropertiesSucceed);

        while(!fetchPropertiesSucceed) {
          yield delay(100);
          fetchPropertiesSucceed = yield select(state => state.property.fetchPropertiesSucceed);
        }

        for (let license of licenses) {
          yield put(notifyClient(license.propertyId, license.year));
        }
      } 
      else yield put(onFetchLicensesFailure(error));
    } catch (error) {
      yield put(onFetchLicensesFailure(error));
    }
  }
}

function* fetchHybridsByLicenseId(token, distAuth, licenseId) {
  try {
    let payload = {
      dist_auth: distAuth,
      idLicencia: licenseId
    }
    
    let encodedPayload = encodePayload(payload, token);
    const { data: { hibridos } } = yield call(requestFetchHybridsByLicenseId, encodedPayload);
    let bagCount = 0;
    let hybrids = hibridos.map((hibrido) => {
      bagCount += parseInt(hibrido.bolsas);
      return {
        id: hibrido.IDHibrido,
        licenseId: hibrido.IDLicencia,
        bags: hibrido.bolsas,
        hectares: hibrido.hectareas,
        cropId: hibrido.IDCultivar,
        technologyId: hibrido.IDTecnologia,
        techTraitId: hibrido.IDCaracteriticaTecnologica,
        externalHybridExist: hibrido.otroHibrido,
        observations: hibrido.observaciones,
        userId: hibrido.IDUsuario,
        creationDate: hibrido.fechaRegistro
      }
    });

    return {
      hybrids,
      bagCount
    }
  } catch (error) {
    console.log("fetchHybridsByLicenseId error:", error);
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