// import * as api from '../../Api/user';
import { userActions } from '../Reducers/user';


export const login = (response) => {
    return async dispatch => {
        try {
            console.log(response)
            localStorage.setItem('auth_token', JSON.stringify(response.token));
            localStorage.setItem('role', JSON.stringify(response.role));
            localStorage.setItem('user', JSON.stringify({ ...response.user, role: response.role }));
            dispatch(userActions.CHANGE_LOGIN(true));
            dispatch(userActions.UPDATE_USER({...response.user, role: response.role}));
        } catch (error) {
            console.log(error)
        }
    }
}

export const signup = (response) => {
    return async dispatch => {
        try {
            localStorage.setItem('auth_token', JSON.stringify(response.token));
            localStorage.setItem('role', JSON.stringify(response.user.role));
            localStorage.setItem('user', JSON.stringify(response.user));
            dispatch(userActions.CHANGE_LOGIN(true));
            dispatch(userActions.UPDATE_USER(response.user));
        } catch (error) {
            console.log(error)
        }
    }
}


export const signout = () => {
    return async dispatch => {
        try {
            localStorage.removeItem("chat-app-user");
            dispatch(userActions.CHANGE_LOGIN(false));
        } catch (error) {
            console.log(error)
        }
    }
}

export const isSignin = () => {
    console.log("aasa", localStorage.getItem('auth_token'));
    console.log(localStorage.getItem('user'))
    return async dispatch => {
        localStorage.getItem('auth_token') ? dispatch(userActions.CHANGE_LOGIN(true)) : dispatch(userActions.CHANGE_LOGIN(false));
        localStorage.getItem('user') && dispatch(userActions.UPDATE_USER(JSON.parse(localStorage.getItem('user'))));
    }
}


