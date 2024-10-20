import './App.css';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductDetails } from './components/product/ProductDetails';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
// import store from './store';
// import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import { UpdatePassword } from './components/user/UpdatePassword';
import { ForgotPassword } from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import {Dashboard} from './components/admin/Dashboard';
import Cart from './components/cart/Cart';
import { Shipping } from './components/cart/Shipping';
import { ConfirmOrder } from './components/cart/ConfirmOrder';
import { Payment } from './components/cart/Payment';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { OrderSuccess } from './components/cart/OrderSuccess';
import { UserOrders } from './components/order/UserOrders';
import { OrderDetail } from './components/order/OrderDetail';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { isAuthenticated} = useSelector(state => state.authState);

  useEffect(() => {
    // store.dispatch(loadUser());
    if(isAuthenticated){
    async function getStripeApiKey() {
      const config = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('token')
        }
      }
      const { data } = await axios.get('http://127.0.0.1:8000/api/v1/stripeapi',config);
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }
  }, [isAuthenticated]);

  return (
    <div className="App">
      <HelmetProvider>
        <Router>
          <Header />
          <div className="container container-fluid">
            <ToastContainer theme="dark" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:keyword" element={<ProductSearch />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/myprofile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/myprofile/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
              <Route path="/myprofile/update/password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route path="/password/reset/:token" element={<ResetPassword />} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
              <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
              <Route path="/order/success" element={<OrderSuccess />} />
              <Route path="/orders" element={<UserOrders />} />
              <Route path="/order/:id" element={<OrderDetail />} />
              {stripeApiKey && (
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                      </Elements>
                    </ProtectedRoute>
                  }
                />
              )}
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
