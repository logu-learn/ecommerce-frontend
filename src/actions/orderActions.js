import {createOrderRequest,createOrderSuccess,createOrderFail} from "../slices/orderSlice"
import axios from "axios"

export const createOrder = order => async(dispatch) => {
  try{
    dispatch(createOrderRequest())
    const {data} = await axios.get('http://127.0.0.1:8000/api/v1/order/new',order)

    dispatch(createOrderSuccess(data))
  }
  catch(error){
    dispatch(createOrderFail(error.response.data.message))
  }
}
