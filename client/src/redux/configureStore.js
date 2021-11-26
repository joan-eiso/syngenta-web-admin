import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import authReducer from "./authentication";
import producerReducer from "./producer";
import propertyReducer from "./property";
import licenseReducer from "./license";
import productReducer from "./product";
import userReducer from "./user";
import rootSaga from "./rootSaga";

const reducer = combineReducers({
  auth: authReducer,
  producer: producerReducer,
  property: propertyReducer,
  license: licenseReducer,
  product: productReducer,
  user: userReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(reducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;