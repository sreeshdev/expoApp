import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import { registerWithMiddleware } from "./sagas";
import { composeWithDevTools } from "@redux-devtools/extension";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "parentApp",
  storage: AsyncStorage,
  // whitelist: ["LoginScreen"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
//composeEnhancers(applyMiddleware(...middlewares))

// Redux: Store
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export { store, persistor };

registerWithMiddleware(sagaMiddleware);
