import { take, call, put, all } from "redux-saga/effects";
import { encodePayload } from '../../utils/jwt.util';
import { requestCreateUser, requestEditUser, requestUsers } from "./request";

import { CREATE_USER_REQUESTED, EDIT_USER_REQUESTED, FETCH_USERS_REQUESTED, onCreateUserFailure, onCreateUserSuccess, onEditUserFailure, onEditUserSuccess, onFetchUsersFailure, onFetchUsersSuccess } from './duck';

export function* fetchUsers() {
  while(true) {
    try {
      const {token, distAuth} = yield take(FETCH_USERS_REQUESTED);

      let payload = {
        dist_auth: distAuth
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { users: usuarios } } = yield call(requestUsers, encodedPayload);
      
      let users = [];
      let distributors = [];
      let administrators = [];

      usuarios.forEach((usuario) => {
        let user = {
          id: usuario.IDUsuario,
          name: usuario.NombreUsuario,
          identification: usuario.IdentificacionUsuario,
          email: usuario.eMailUsuario,
          password: usuario.Clave,
          temp: usuario.Temp,
          status: usuario.Estado,
          company: usuario.Empresa,
          groupId: usuario.IDGrupo,
          rank: usuario.IDNivel,
          creationDate: usuario.FechaRegistro,
        }

        users.push(user);
        if(user.rank === 1) distributors.push(user);
        if(user.rank === 2) administrators.push(user);
      });
      yield put(onFetchUsersSuccess(users, distributors, administrators));
    } catch (error) {
      yield put(onFetchUsersFailure(error));
    }
  }
}

export function* createUser() {
  while(true) {
    try {
      const { token, userPayload } = yield take(CREATE_USER_REQUESTED);
      let payload = {
        dist_auth: userPayload.distAuth,
        nombreUsuario: userPayload.name,
        identificacionUsuario: userPayload.identification,
        eMailUsuario: userPayload.email,
        clave: userPayload.password,
        temp: userPayload.temp,
        estado: userPayload.status,
        empresa: userPayload.company,
        IDGrupo: userPayload.groupId,
        IDNivel: userPayload.rank,
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { statusCode, response: error } } = yield call(requestCreateUser, encodedPayload);
      if(statusCode === 200) yield put(onCreateUserSuccess());
      else yield put(onCreateUserFailure(error));
    } catch (error) {
      yield put(onCreateUserFailure(error));
    }
  }
}

export function* editUser() {
  while(true) {
    try {
      const { token, userPayload } = yield take(EDIT_USER_REQUESTED);
      let payload = {
        dist_auth: userPayload.distAuth,
        IDUsuario: userPayload.id,
        nombreUsuario: userPayload.name,
        identificacionUsuario: userPayload.identification,
        eMailUsuario: userPayload.email,
        clave: userPayload.password,
        temp: userPayload.temp,
        estado: userPayload.status,
        empresa: userPayload.company,
        IDGrupo: userPayload.groupId,
        IDNivel: userPayload.rank,
      }
      let encodedPayload = encodePayload(payload, token);
      let { data: { statusCode, response: error } } = yield call(requestEditUser, encodedPayload);
      if(statusCode === 200) yield put(onEditUserSuccess());
      else yield put(onEditUserFailure(error));
    } catch (error) {
      yield put(onEditUserFailure(error));
    }
  }
}

export default function* watcherSaga() {
  yield all([
    fetchUsers(),
    createUser(),
    editUser(),
  ]);
}