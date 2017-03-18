import {routerReducer} from "react-router-redux";
import {combineReducers} from "redux";
import { ApolloClient, ApolloProvider } from 'react-apollo';
import Application from "./application";
import Auth from "./auth";
import WebPreferenceTypes from "./web_preference_types";

const client = new ApolloClient();

const reducer = combineReducers({
	app: Application,
	auth: Auth,
	web_preference_types: WebPreferenceTypes,
	routing: routerReducer,
	apollo: client.reducer()
});

export default reducer;
