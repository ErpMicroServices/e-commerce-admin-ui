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
    API_STATUS_FINISHED,
    API_RESULT_FAILURE,
    API_RESULT_SUCCESS,
    API_STATUS_STARTED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    FETCH_PROTECTED_DATA_REQUEST,
    RECEIVE_PROTECTED_DATA,
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
} = constants;

export function loginUser(username, password, redirect = "/") {
    return function(dispatch) {
        dispatch(loginUserRequest());
        dispatch(loginUserSuccess(data.token));
        dispatch(push(redirect));
    }
}

export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: API_STATUS_FINISHED,
            result: API_RESULT_FAILURE,
            error: convertErrorToString(error)
        }
    }
}

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST
    }
}

export function loginUserSuccess( token) {
  try{
    let decoded = jwtDecode(token);
    localStorage.setItem('token', token);
    // axios.defaults.headers.common['Authorization'] = token;
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            status: API_STATUS_FINISHED,
            result: API_RESULT_SUCCESS,
            jwt: {
                decoded,
                token
            }
        }
    }
  } catch(error) {
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: API_STATUS_FINISHED,
            result: API_RESULT_FAILURE,
            error: "Could not automatically log you in, please login again."
        }
    }
  }

}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        dispatch(push('/login'));
    }
}

export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    }
}

export function registerUser(username, password, redirect = "/") {
    return function(dispatch) {
        dispatch(registerUserRequest());
        dispatch({
                    type: REGISTER_USER_SUCCESS,
                    payload: {
                        status: API_STATUS_FINISHED,
                        result: API_RESULT_SUCCESS,
                        jwt: {
                            decoded,
                            token: data.token
                        }
                    }
                });
        dispatch(push(redirect));
        // return axios.post('/api/user/register', {
        //         username,
        //         password
        //     })
        //     .then(checkHttpStatus)
        //     .then(parseJSON)
        //     .then(data => {
        //         let decoded = jwtDecode(data.token);
        //         dispatch({
        //             type: REGISTER_USER_SUCCESS,
        //             payload: {
        //                 status: API_STATUS_FINISHED,
        //                 result: API_RESULT_SUCCESS,
        //                 jwt: {
        //                     decoded,
        //                     token: data.token
        //                 }
        //             }
        //         });
        //     })
        //     .then(() => dispatch(push(redirect)))
        //     .catch(error => {
        //         dispatch({
        //             type: REGISTER_USER_FAILURE,
        //             payload: {
        //                 status: API_STATUS_FINISHED,
        //                 result: API_RESULT_FAILURE,
        //                 error: convertErrorToString(error)
        //             }
        //         });
        //     })
    }
}

export function registerUserRequest() {
    return {
        type: REGISTER_USER_REQUEST
    }
}

export function registerUserSuccess(token) {
  localStorage.setItem('token', token);
  let decoded = jwtDecode(token);
  // axios.defaults.headers.common['Authorization'] = token;
  return {
      type:REGISTER_USER_SUCCESS,
      payload: {
          status: API_STATUS_FINISHED,
          result: API_RESULT_SUCCESS,
          jwt: {
              decoded,
              token
          }
      }
  }
}
