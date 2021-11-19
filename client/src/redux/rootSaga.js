import { all } from "redux-saga/effects";
import { producerWatcherSaga } from "./producer";

export default function* rootSaga() {
  yield all([
    producerWatcherSaga(),
  ]);
}