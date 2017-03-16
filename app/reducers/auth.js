import {
    createReducer
} from "react-templates-and-utils";
import constants from "../constants";
import {
    pushState
} from 'react-router-redux';
import jwtDecode from 'jwt-decode';

let {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
} = constants;

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    },
    [LOGIN_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'token': payload.token,
            'userName': payload.jwt.decoded.username,
            'jwt': payload.jwt,
            'token': payload.jwt.token
        });

    },
    [LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'userName': null
        });
    },
    [LOGOUT_USER]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'userName': null
        });
    },
    [REGISTER_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    },
    [REGISTER_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'token': payload.token,
            'userName': payload.jwt.decoded.username,
            'jwt': payload.jwt,
            'token': payload.jwt.token
        });

    },
    [REGISTER_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'userName': null
        });
    }
});
