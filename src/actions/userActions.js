import axios from 'axios';
import Cookies from 'js-cookie';
import { 
    loginFail, loginRequest, loginSuccess,
    registerRequest, registerSuccess, registerFail,
    loadUserRequest, loadUserSuccess, loadUserFail,
    logoutSuccess, logoutFail,
    updateProfileRequest, updateProfileSuccess, updateProfileFail,
    updatePasswordFail, updatePasswordRequest, updatePasswordSuccess,
    forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess,
    resetPasswordFail, resetPasswordRequest, resetPasswordSuccess,
    clearError
} from '../slices/authSlice';

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch(loginRequest());

        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/login`, { email, password });

        // Store the token in a cookie
        Cookies.set('token', data.token, { expires: 7 }); // The token will expire in 7 days

        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFail(error.response.data.message));
    }
};

export const clearAuthError = (dispatch) => {
    dispatch(clearError());
};

export const register = (formData) => async(dispatch) => {
    try {
        dispatch(registerRequest());
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post('http://127.0.0.1:8000/api/v1/register', formData, config);

        // Store the token in a cookie
        Cookies.set('token', data.token, { expires: 7 });

        dispatch(registerSuccess(data)); 
    } catch (error) {
        dispatch(registerFail(error.response.data.message));
    }
};

export const loadUser = () => async(dispatch) => {
    try {   
        dispatch(loadUserRequest());
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            }
        }
        const { data } = await axios.get('http://127.0.0.1:8000/api/v1/myprofile',config);
        dispatch(loadUserSuccess(data)); 
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
    }
};

export const logout = () => async(dispatch) => {
    try {
        Cookies.remove('token'); // Remove the token cookie on logout
        dispatch(logoutSuccess()); 
    } catch (error) {
        dispatch(logoutFail(error.response.data.message));
    }
};

export const updateProfile = (userData) => async(dispatch) => {
    try {
        dispatch(updateProfileRequest());

        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            }
        }
        const { data } = await axios.put('http://127.0.0.1:8000/api/v1/update', userData, config);
        dispatch(updateProfileSuccess(data)); 
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message));
    }
};

export const updatePassword = (formData) => async(dispatch) => {
    try {
        dispatch(updatePasswordRequest());
        const config = { headers: { "Content-Type": "application/json" } };
        await axios.put('http://127.0.0.1:8000/api/v1/password/change', formData, config);
        dispatch(updatePasswordSuccess()); 
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message));
    }
};

export const forgotPassword = (formData) => async(dispatch) => {
    try {
        dispatch(forgotPasswordRequest());
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('http://127.0.0.1:8000/api/v1/password/forgot', formData, config);
        dispatch(forgotPasswordSuccess(data)); 
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message));
    }
};

export const resetPassword = (formData, token) => async(dispatch) => {
    try {
        dispatch(resetPasswordRequest());
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/password/reset/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data)); 
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message));
    }
};
