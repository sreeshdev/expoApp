import * as AppBaseSagas from "../modules/sagas";

const sagas = {
  ...AppBaseSagas,
};

// Run Sagas
export function registerWithMiddleware(middleware) {
  for (let name in sagas) {
    middleware.run(sagas[name]);
  }
}
