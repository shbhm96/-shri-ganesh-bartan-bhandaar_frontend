import { applyMiddleware, compose } from "redux";
import { initialState, rootReducer } from "./reducers/rootReducers";
import thunk from "redux-thunk";
import { legacy_createStore as createStore } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const store = createStore(rootReducer,initialState,composeEnhancers(applyMiddleware(thunk)))

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,

})

export default store;