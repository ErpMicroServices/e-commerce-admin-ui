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

import {
    graphql
} from 'react-apollo';
import {
    connect
} from 'react-redux';

let {
    API_RESULT_SUCCESS,
    API_STATUS_FINISHED,
    API_STATUS_STARTED,
    WEB_PREFERENCE_TYPES_ADD,
    WEB_PREFERENCE_TYPES_LOAD_BEGIN,
    WEB_PREFERENCE_TYPES_LOAD_SUCCESS,
} = constants;

export function load(data) {

    console.log("load(data): ", data);
    if (data.loading) {
      return ({
        type: WEB_PREFERENCE_TYPES_LOAD_BEGIN,
        payload: {
          status: API_STATUS_STARTED,
        }
      })
    } else {
        return ({
            type: WEB_PREFERENCE_TYPES_LOAD_SUCCESS,
            payload: {
                list: data.web_preference_types || [],
                status: API_STATUS_FINISHED,
                result: API_RESULT_SUCCESS
            }
        });
    }
}

export function add(newWebPreferenceType) {
    return {
        type: WEB_PREFERENCE_TYPES_ADD,
        payload: {
            newWebPreferenceType
        }
    }
}
