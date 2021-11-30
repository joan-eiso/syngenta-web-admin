import { take, call, put, all } from "redux-saga/effects";

import { CREATE_CROP_REQUESTED, FETCH_CROPS_REQUESTED, fetchCrops as fetchCropsAC, onCreateCropFailure, onCreateCropSuccess, onFetchCropsFailure, onFetchCropsSuccess, FETCH_TECH_TRAITS_REQUESTED, onFetchTechTraitsSuccess, onFetchTechTraitsFailure, FETCH_TECHNOLOGIES_REQUESTED, onFetchTechnologiesSuccess, onFetchTechnologiesFailure } from "./duck";
import { requestCreateCrop, requestFetchCrops, requestFetchTechnologies, requestFetchTechTraits } from "./request";

import { encodePayload } from "../../utils/jwt.util";

function* fetchCrops() {
  while(true) {
    try {
      const { token, distAuth } = yield take(FETCH_CROPS_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { cultivares } } = yield call(requestFetchCrops, encodedPayload);

      let crops = cultivares.map((cultivar) => ({
        id: cultivar.IDCultivar,
        name: cultivar.cultivar,
      }));
      yield put(onFetchCropsSuccess(crops));
    } catch (error) {
      yield put(onFetchCropsFailure(error));
    }
  }
}

function* createCrop() {
  while(true) {
    try {
      const { token, distAuth, name } = yield take(CREATE_CROP_REQUESTED);
      let payload = {
        dist_auth: distAuth,
        cultivar: name
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { statusCode, message: error } } = yield call(requestCreateCrop, encodedPayload);
      if(statusCode === 200) {
        yield put(onCreateCropSuccess());
        yield put(fetchCropsAC(token, distAuth));
      } 
      else yield put(onCreateCropFailure(error));
    } catch (error) {
      yield put(onCreateCropFailure(error));
    }
  }
}

function* fetchTechnologies() {
  while(true) {
    try {
      const { token, distAuth } = yield take(FETCH_TECHNOLOGIES_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { tecnologias } } = yield call(requestFetchTechnologies, encodedPayload);

      let technologies = tecnologias.map((tecnologia) => ({
        id: tecnologia.IDTecnologia,
        name: tecnologia.tecnologia,
      }));
      yield put(onFetchTechnologiesSuccess(technologies));
    } catch (error) {
      yield put(onFetchTechnologiesFailure(error));
    }
  }
}

function* fetchTechTraits() {
  while(true) {
    try {
      const { token, distAuth } = yield take(FETCH_TECH_TRAITS_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { caracteristicaTecnologica: caracteristicas } } = yield call(requestFetchTechTraits, encodedPayload);

      let techTraits = caracteristicas.map((caracteristica) => ({
        id: caracteristica.IDCaracteriticaTecnologica,
        name: caracteristica.caracteristicaTecnologica,
      }));
      yield put(onFetchTechTraitsSuccess(techTraits));
    } catch (error) {
      yield put(onFetchTechTraitsFailure(error));
    }
  }
}

export default function* watcherSaga() {
  yield all([
    fetchCrops(),
    createCrop(),
    fetchTechnologies(),
    fetchTechTraits()
  ]);
}