import {
    NAME,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SIGNUP_START,
    SIGNUP_FAILED,
    SIGNUP_SUCCESS,
    LOGOUT,
    AUTHENTICATE_USER,
} from "./actionTypes"
import axios from "axios";
import { Navigate } from "react-router-dom";


export function startLogin() {
    console.log("caling startlogin action");
    return {
        type: LOGIN_START,
    }

}
export function startSignUp() {
    return {
        type: SIGNUP_START,
    }

}
export function loginFailed(errorMessage) {
    return {
        type: LOGIN_FAILED,
        error: errorMessage
    }

}
export function signUpFailed(errorMessage) {
    console.log("errorBooom",errorMessage);
      return {
        type: SIGNUP_FAILED,
        error: errorMessage
    }

}
export function loginSuccess(user) {
    console.log("userrrrr", user);
    return {
        type: LOGIN_SUCCESS,
        user: user
    }

}
export function signUpSuccess(user) {
    console.log("userrrrr", user);
    return {
        type: SIGNUP_SUCCESS,
        user: user
    }

}
export function login(values) {
    console.log("calling api");
    console.log("values", values)
    return async (dispatch) => {
        const response = await axios.post(`http://localhost:8000/auth/login`, values);
        //   console.log("API res", response);
        console.log("api again", response);
        if (response.data.success == true) {
            console.log("token", response.data.data.user);
            localStorage.setItem("token", response.data.data.token);
            console.log("login success");
            dispatch(loginSuccess(response.data.data.user));
              


        } else {
            dispatch(loginFailed(response.data.message));
        }

    }

}

export function signUp(values) {
    console.log("calling api");
    console.log("values", values)
    return async (dispatch) => {
        const response = await axios.post(`http://localhost:8000/auth/register`, values);
        //   console.log("API res", response);
        console.log("api again", response);
        if (response.data.success == true) {
            console.log("token", response.data.data.token);
            console.log("user", response.data.data.user);

            localStorage.setItem("token", response.data.data.token);
            console.log("login success");
            dispatch(signUpSuccess(response.data.data.user));




        } else {
            // console.log(response.data.message);
            dispatch(signUpFailed(response.data.message));
        }

    }

}

export function authenticateUser(user) {
    return {
        type: AUTHENTICATE_USER,
        user: user
    }

}