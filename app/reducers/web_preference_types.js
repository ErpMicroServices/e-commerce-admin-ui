import {
    createReducer
} from "react-templates-and-utils";
import constants from "../constants";
import {
    pushState
} from 'react-router-redux';
import jwtDecode from 'jwt-decode';

let {
    WEB_PREFERENCE_TYPES_ADD,
    WEB_PREFERENCE_TYPES_LOAD_BEGIN,
    WEB_PREFERENCE_TYPES_LOAD_SUCCESS
} = constants;

const initialState = {
    list: []
};

export default createReducer(initialState, {
    [WEB_PREFERENCE_TYPES_LOAD_SUCCESS]: (state, payload) => Object.assign({}, {
        list: payload.list
    }),
    [WEB_PREFERENCE_TYPES_ADD]: (state, payload) => Object.assign({}, {
        list: [...state.list, payload.newWebPreferenceType]
    })
});
