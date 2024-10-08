import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:"auth",
    initialState: {
        loading: false,
        isAuthenticated: false,
        registerSuccess:false,
        isUpdated: false
    },
    reducers:{
        loginRequest(state,action){ 
            return{
                ...state,
                loading: true
            }
        },
        loginSuccess(state,action){
            return{
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loginFail(state,action){
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action){
            return {
                ...state,
                error:  null
            }
        },
        loadUserRequest(state,action){
            return{
                ...state,
                isAuthenticated: false,
                loading: true
            }
        },
        loadUserSuccess(state,action){
            return{
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loadUserFail(state,action){
            return{
                ...state,
                loading:false
            }
        },
        registerRequest(state,action){
            return{
                ...state,
                loading: true
            }
        },
        registerSuccess(state,action){
            return{
                loading: false,
                registerSuccess: true,
                user: action.payload.user
            }
        },
        registerFail(state,action){
            return{
                ...state,
                error: action.payload
            }
        },
        logoutSuccess(state,action){
            return{
                loading: false,
                isAuthenticated: false
            }
        },
        logoutFail(state,action){
            return{
                ...state,
                error: action.payload
            }
        },
        updatePasswordRequest(state,action){
            return{
                ...state,
                loading: true,
                isUpdated:false
            }
        },
        updatePasswordSuccess(state,action){
            return{
                ...state,
                loading: false,
                isUpdated: true
            }
        },
        updatePasswordFail(state,action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        },
        updateProfileRequest(state,action){
            return{
                ...state,
                loading: true,
                isUpdated:false
            }
        },
        updateProfileSuccess(state,action){
            return{
                ...state,
                loading: false,
                user: action.payload.user,
                isUpdated: true
            }
        },
        updateProfileFail(state,action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        },
        forgotPasswordRequest(state,action){
            return{
                ...state,
                loading: true,
                message: null
            }
        },
        forgotPasswordSuccess(state,action){
            return{
                ...state,
                loading: false,
                message: action.payload.message
            }
        },
        forgotPasswordFail(state,action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        },
        resetPasswordRequest(state,action){
            return{
                ...state,
                loading: true
            }
        },
        resetPasswordSuccess(state,action){
            return{
                ...state,
                loading: false,
                user: action.payload.user,
                isAuthenticated:true
            }
        },
        resetPasswordFail(state,action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        }
    }
})

const {actions,reducer} = authSlice;

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    clearError,
    updatePasswordFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} = actions;

export default reducer