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

import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

let {
    API_RESULT_SUCCESS,
    API_STATUS_FINISHED,
    API_STATUS_STARTED,
    WEB_PREFERENCE_TYPES_ADD,
    WEB_PREFERENCE_TYPES_LOAD_BEGIN,
    WEB_PREFERENCE_TYPES_LOAD_SUCCESS,
} = constants;

export function load() {
    return (dispatch, state) => {        
        dispatch({
            type: WEB_PREFERENCE_TYPES_LOAD_BEGIN,
            payload: {
                status: API_STATUS_STARTED
            }
        });

        dispatch({
            type: WEB_PREFERENCE_TYPES_LOAD_SUCCESS,
            payload: {
                list: state().web_preference_types.list,
                status: API_STATUS_FINISHED,
                result: API_RESULT_SUCCESS
            }
        });
    }
}

export function add( newWebPreferenceType) {
  console.log("add: ", newWebPreferenceType);
  return {
    type: WEB_PREFERENCE_TYPES_ADD,
    payload: {
      newWebPreferenceType
    }
  }
}
