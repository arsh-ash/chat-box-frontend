import {NAME,
    LOGIN_START,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    SIGNUP_START,
    SIGNUP_FAILED,
    SIGNUP_SUCCESS,
    LOGOUT,
    AUTHENTICATE_USER
} from "../actions/actionTypes"

const initialAuthState={
    user:{},
    isLoggedin:false,
    inProgress:false,
    error:null,
}

export default function auth(state=initialAuthState,action){
    console.log("auth reducer called")
    if(action.type===LOGIN_START||action.type===SIGNUP_START){
        return {
            ...state,
            inProgress:true

        }
    }
    else if(action.type===LOGIN_SUCCESS|| action.type===SIGNUP_SUCCESS){
        return {
                ...state,
                user: action.user,
                isLoggedin: true,
                inProgress: false,
                error: null,
              };
        

    }
    else if(action.type===LOGIN_FAILED || action.type===SIGNUP_FAILED){
        console.log("action error",action.error);

        return{
            ...state,
            inProgress:false,
            error:action.error,
            user:null
            
        }
        

    }
    else if(action.type===AUTHENTICATE_USER){
        return{
            ...state,
            isLoggedin:true,
            user:action.user
           }
    
       }

    return  state;

}