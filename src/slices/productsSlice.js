import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name:"products",
    initialState: {
        loading: false
    },
    reducers:{
        productsRequest(state,action){
            return{
                ...state,
                loading: true 
            }
        },
        productsSuccess(state,action){
            return{
                ...state,
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.count,
                resPerPage: action.payload.resPerPage
            }
        },
        productsFail(state,action){
            return{...state,
                loading: false,
                error: action.payload
            }
        }
    }
})

const {actions,reducer} = productsSlice;

export const {productsRequest,productsSuccess,productsFail} = actions;

export default reducer