import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name:"product",
    initialState: {
        loading: false,
        product:{}
    },
    reducers:{
        productRequest(state,action){
            return{
                ...state,
                loading: true 
            }
        },
        productSuccess(state,action){
            return{
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        productFail(state,action){
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
})

const {actions,reducer} = productSlice;

export const {productRequest,productSuccess,productFail} = actions;

export default reducer