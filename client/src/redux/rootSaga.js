import { all } from "redux-saga/effects";
import { authWatcherSaga } from "./authentication";
import { producerWatcherSaga } from "./producer";
import { propertyWatcherSaga } from "./property";
import { licenseWatcherSaga } from "./license";
import { userWatcherSaga } from "./user";

export default function* rootSaga() {
  yield all([
    authWatcherSaga(),
    producerWatcherSaga(),
    propertyWatcherSaga(),
    licenseWatcherSaga(),
    userWatcherSaga(),
  ]);
}