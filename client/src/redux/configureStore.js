import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import authReducer from "./authentication";
import producerReducer from "./producer";
import propertyReducer from "./property";
import licenseReducer from "./license";
import rootSaga from "./rootSaga";
import userReducer from "./user";

const reducer = combineReducers({
  auth: authReducer,
  producer: producerReducer,
  property: propertyReducer,
  license: licenseReducer,
  user: userReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(reducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;