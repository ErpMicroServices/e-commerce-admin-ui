import {routerReducer} from "react-router-redux";
import {combineReducers} from "redux";
import Application from "./application";
import Auth from "./auth";

const reducer = combineReducers({
	app: Application,
	auth: Auth,
	routing: routerReducer
});

export default reducer;
