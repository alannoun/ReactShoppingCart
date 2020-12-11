import { USER_LOGOUT_FAIL,USER_LOGOUT_REQUEST,USER_LOGOUT_SUCCESS ,USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstants";


export default function(state={}, action) {
    switch(action.type){
        case USER_SIGNIN_REQUEST:
        case USER_LOGOUT_REQUEST:
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
        case USER_LOGOUT_FAIL:
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload};
 
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: null
            
            };
        default:
            return state;
    }
}

