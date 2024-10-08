import React, { useEffect } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateShipping } from '../cart/Shipping';
import axios from 'axios';
import { toast } from 'react-toastify';
import { orderCompleted } from '../../slices/cartSlice';

export const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const { user } = useSelector(state => state.authState);
    const { items: cartItems, shippingInfo } = useSelector(state => state.cartState);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
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
        shippingInfo
    };

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice;
        order.shippingPrice = orderInfo.shippingPrice;
        order.taxPrice = orderInfo.taxPrice;
        order.totalPrice = orderInfo.totalPrice;
    }

    useEffect(() => {
        validateShipping(shippingInfo, navigate);
    }, [shippingInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;

        try {
            const { data } = await axios.post('http://127.0.0.1:8000/api/v1/payment/process', paymentData);
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
                            country: shippingInfo.country
                        }
                    }
                }
            });

            if (result.error) {
                console.error(result.error.message);

                toast.error((await result).error.message,{
                  type: 'error',
                  position:'bottom-center'
              })

                document.querySelector('#pay_btn').disabled = false;
            } else {
                if ((await result).paymentIntent.status === 'succeeded') {
                  toast('Payment Success!',{
                    type: 'success',
                    position:'bottom-center'
                  })
                    dispatch(orderCompleted())
                    navigate('/order/success');
                }
                else{
                  toast('Please Try again!',{
                    type: 'warning',
                    position:'bottom-center'
                  })
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
                        Pay {`$${orderInfo && orderInfo.totalPrice}`}
                    </button>
                </form>
            </div>
        </div>
    );
};
