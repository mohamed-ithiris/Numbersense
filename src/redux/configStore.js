// Redux
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// Redux Persist
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// Saga
import createSagaMiddleware from "redux-saga";
// All Reducers
import { reducer } from "./ducks/reducers";
// All Sagas
import rootSaga from "./sagas";
// Logger
// import { logger } from "redux-logger";

const configStore = () => {
  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["data"],
  };

  const rootReducer = combineReducers({
    data: reducer,
  });

  // with Persist

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(
        sagaMiddleware
        // , logger
      )
    )
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};

export default configStore;
