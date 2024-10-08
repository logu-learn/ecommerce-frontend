import { combineReducers } from 'redux';
import {configureStore} from "@reduxjs/toolkit"
// import {thunk} from 'redux-thunk';
import productsReducer from './slices/productsSlice';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

const reducer = combineReducers({
   productsState: productsReducer,
   productState: productReducer,
   authState: authReducer,
   cartState: cartReducer
})


const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(/* your custom middleware here */)

})

export default store