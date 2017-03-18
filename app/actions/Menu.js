import constants from "../constants";
import {
    push
} from "react-router-redux";
import {
    checkHttpStatus,
    parseJSON,
    convertErrorToString
} from "react-templates-and-utils";
import jwtDecode from 'jwt-decode';

let {

} = constants;

export function openWebTypes() {
    return (dispatch, state) => {
        dispatch(push(null, '/web_preference_types'));
    }
}
