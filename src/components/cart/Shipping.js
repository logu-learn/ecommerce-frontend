import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countries } from "countries-list";
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../../slices/cartSlice';
import { CheckoutStep } from './CheckoutStep';
import { toast } from 'react-toastify';

export const validateShipping = (shippingInfo, navigate) => {
    if (!shippingInfo.address || 
        !shippingInfo.city || 
        !shippingInfo.phoneNo || 
        !shippingInfo.postalcode || 
        !shippingInfo.country || 
        !shippingInfo.state) {
        toast("Please fill the shipping information", {
            type: "error",
            position: 'bottom-center'
        });
        navigate("/shipping");
    }
}

export const Shipping = () => {
    const { shippingInfo = {} } = useSelector(state => state.cartState);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [postalcode, setPostalCode] = useState(shippingInfo.postalcode);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    
    const countriesList = Object.values(countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        validateShipping({ address, city, phoneNo, postalcode, country, state }, navigate);
        dispatch(saveShippingInfo({ address, city, phoneNo, postalcode, country, state }));
        navigate('/order/confirm');
    }

    return (
        <>
            <CheckoutStep shipping={true} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="tel"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalcode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                {countriesList.map((country) => (
                                    <option key={country.alpha2Code} value={country.alpha2Code}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <input
                                type="text"
                                id="state_field"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
