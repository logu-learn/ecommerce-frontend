import React from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { orderCompleted } from '../../slices/cartSlice';
import { createOrder } from '../../actions/orderActions';
// import { clearError as clearOrderError } from '../../slices/orderSlice';

export const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')) || {}; // Default to empty object
    const { user } = useSelector(state => state.authState);
    const { items: cartItems, shippingInfo } = useSelector(state => state.cartState);
    // const { error: orderError } = useSelector(state => state.orderState);

    // Safely access totalPrice and ensure orderInfo is an object
    const paymentData = {
        amount: Math.round((orderInfo.totalPrice || 0) * 100),
        shipping: {
            name: user.name,
            address: {
                city: shippingInfo.city,
                postal_code: shippingInfo.postalCode,
                country: shippingInfo.country,
                line1: shippingInfo.address
            },
            phone: shippingInfo.phoneNo
        }
    };

    const order = {
        orderItems: cartItems,
        shippingInfo,
        itemsPrice: orderInfo.itemsPrice || 0,
        shippingPrice: orderInfo.shippingPrice || 0,
        taxPrice: orderInfo.taxPrice || 0,
        totalPrice: orderInfo.totalPrice || 0,
    };

    // useEffect(() => {
    //     if(orderError){
    //         toast("Please fill the shipping information", {
    //             type: "error",
    //             position: 'bottom-center'
    //         });
    //     }
    // }, []);


    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                }
            };
            const { data } = await axios.post('http://127.0.0.1:8000/api/v1/payment/process', paymentData, config);
            const clientSecret = data.client_secret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.postalCode,
                            country: shippingInfo.country.iso
                        }
                    }
                }
            });

            if (result.error) {
                console.error(result.error.message);
                toast.error(result.error.message, {
                    type: 'error',
                    position: 'bottom-center'
                });
                document.querySelector('#pay_btn').disabled = false;
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    toast('Payment Success!', {
                        type: 'success',
                        position: 'bottom-center'
                    });
                    dispatch(orderCompleted());
                    dispatch(createOrder(order));

                    navigate('/order/success');
                } else {
                    toast('Please Try again!', {
                        type: 'warning',
                        position: 'bottom-center'
                    });
                }
            }
        } catch (error) {
            console.error(error);
            document.querySelector('#pay_btn').disabled = false;
        }
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-4">Card Info</h1>
                    <div className="form-group">
                        <label htmlFor="card_num_field">Card Number</label>
                        <CardNumberElement id="card_num_field" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="card_exp_field">Card Expiry</label>
                        <CardExpiryElement id="card_exp_field" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="card_cvc_field">Card CVC</label>
                        <CardCvcElement id="card_cvc_field" className="form-control" />
                    </div>

                    <button id="pay_btn" type="submit" className="btn btn-block py-3">
                        Pay {`$${orderInfo.totalPrice || 0}`} {/* Safely access totalPrice */}
                    </button>
                </form>
            </div>
        </div>
    );
};
