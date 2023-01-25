import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer.js";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  compose(
      applyMiddleware(thunk),
      window._REDUX_DEVTOOLS_EXTENSION_
          ? window._REDUX_DEVTOOLS_EXTENSION_()
          : f => f
  )
);
  
  export default store;

