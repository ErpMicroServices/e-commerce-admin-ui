import {applyMiddleware, createStore} from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import {routerMiddleware} from "react-router-redux";
import {hashHistory} from "react-router";

import {reducer} from "../reducers";

const loggerMiddleware = createLogger();

const store = createStore(
	reducer,
	applyMiddleware(
		routerMiddleware(hashHistory),
		thunkMiddleware,
		loggerMiddleware
	));

export default store;
