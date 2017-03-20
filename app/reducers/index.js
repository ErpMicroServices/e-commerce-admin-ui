import {routerReducer} from "react-router-redux";
import {combineReducers} from "redux";
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import Application from "./application";
import Auth from "./auth";

const client = new ApolloClient({
	networkInterface: createNetworkInterface({ uri: "http://localhost/api/e-commerce/admin"}),
	dataIdFromObject: o => o.id || "new"
});

const reducer = combineReducers({
	app: Application,
	auth: Auth,	
	routing: routerReducer,
	apollo: client.reducer()
});

export {reducer, client};
