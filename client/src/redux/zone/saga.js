import { take, call, put, all } from "redux-saga/effects";
import { encodePayload } from "../../utils/jwt.util";

import { FETCH_CITIES_REQUESTED, FETCH_COUNTRIES_REQUESTED, FETCH_DEPARTMENTS_REQUESTED, FETCH_SUBREGIONS_REQUESTED, onFetchCitiesFailure, onFetchCitiesSuccess, onFetchCountriesFailure, onFetchCountriesSuccess, onFetchDepartmentsFailure, onFetchDepartmentsSuccess, onFetchSubregionsFailure, onFetchSubregionsSuccess } from "./duck";

import { requestFetchCities, requestFetchCountries, requestFetchDepartments, requestFetchSubregions } from "./request";

function* fetchCountries() {
  while(true) {
    try {
      const { token, distAuth } = yield take(FETCH_COUNTRIES_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { statusCode, paises, message } } = yield call(requestFetchCountries, encodedPayload);
      
      let countries = paises.map((pais) => ({
          id: pais.IDPais,
          name: pais.pais,
      }));
      if(statusCode === 200) yield put(onFetchCountriesSuccess(countries));
      else yield put(onFetchCountriesFailure(message));
    } catch (error) {
      yield put(onFetchCountriesFailure(error));
    }
  }
}

function* fetchDepartments() {
  while(true) {
    try {
      const { token, distAuth } = yield take(FETCH_DEPARTMENTS_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { statusCode, departamentos, message } } = yield call(requestFetchDepartments, encodedPayload);
      
      let departments = departamentos.map((departamento) => ({
          id: departamento.IDDepartamento,
          name: departamento.departamento,
          countryId: departamento.IDPais,
      }));
      if(statusCode === 200) yield put(onFetchDepartmentsSuccess(departments));
      else yield put(onFetchDepartmentsFailure(message));
    } catch (error) {
      yield put(onFetchDepartmentsFailure(error));
    }
  }
}

function* fetchCities() {
  while(true) {
    try {
      const { token, distAuth } = yield take(FETCH_CITIES_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { statusCode, municipios, message } } = yield call(requestFetchCities, encodedPayload);
      
      let cities = municipios.map((city) => ({
          id: city.IDMunicipio,
          name: city.municipio,
          countryId: city.IDPais,
          departmentId: city.IDDepartamento,
          subregionId: city.IDSubregion,
      }));
      if(statusCode === 200) yield put(onFetchCitiesSuccess(cities));
      else yield put(onFetchCitiesFailure(message));
    } catch (error) {
      yield put(onFetchCitiesFailure(error));
    }
  }
}

function* fetchSubregions() {
  while(true) {
    try {
      const { token, distAuth } = yield take(FETCH_SUBREGIONS_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { statusCode, subregiones, message } } = yield call(requestFetchSubregions, encodedPayload);
      
      let subregions = subregiones.map((subregion) => ({
          id: subregion.IDSubregion,
          name: subregion.subRegion,
          region: subregion.region,
          countryId: subregion.IDPais,
      }));
      if(statusCode === 200) yield put(onFetchSubregionsSuccess(subregions));
      else yield put(onFetchSubregionsFailure(message));
    } catch (error) {
      yield put(onFetchSubregionsFailure(error));
    }
  }
}

export default function* watcherSaga() {
  yield all([
    fetchCountries(),
    fetchDepartments(),
    fetchCities(),
    fetchSubregions()
  ]);
}