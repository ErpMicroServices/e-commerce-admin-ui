import axios from "axios";
import {hashHistory, IndexRoute, Route, Router} from "react-router";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import {syncHistoryWithStore, push} from "react-router-redux";
import Layout from "./components/Layout";
// import requireAuthentication from "./components/AuthenticatedComponent";
import store from "../store";
import index from "./containers/index.js";

const history = syncHistoryWithStore(hashHistory, store);

const mountNode = document.getElementById('root');

axios.create({
	validateStatus: function (status) {
		return status < 300;
	}
});

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    console.log("error response: ", error);
		if( error.response.status === 403) {
			store.dispatch(logoutAndRedirect());
		}
    return Promise.reject(error);
  });
//
// let token = localStorage.getItem('token');
// if (token !== null) {
//     store.dispatch(loginUserSuccess(token));
// }
// <IndexRoute component={requireAuthentication(DeckList)}></IndexRoute>

ReactDOM.render(<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Layout}>
				<IndexRoute component={index}></IndexRoute>
			</Route>
		</Router>
	</Provider>
	, mountNode);
