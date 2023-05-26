import { applyMiddleware, compose } from "redux";
import { initialState, rootReducer } from "./reducers/rootReducers";
import thunk from "redux-thunk";
import { legacy_createStore as createStore } from "redux";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,initialState,composeEnhancers(applyMiddleware(thunk)))

export default store;