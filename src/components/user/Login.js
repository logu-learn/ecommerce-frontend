import React, { useState } from 'react'
import MetaData from '../Layouts/MetaData'
import { useDispatch } from 'react-redux';
import {login,clearAuthError} from "../../actions/userActions";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {toast} from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const {loading,error,isAuthenticated} = useSelector((state => state.authState))
    const redirect = location.search ? '/'+location.search.split('-')[1] : '/'

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(login(email,password))
      }
      

      useEffect(() => {
        if(isAuthenticated){
            navigate(redirect)
        }
        if(error){
        toast.error(error,{
            position:'bottom-center',
            onOpen: ()=>{dispatch(clearAuthError)}
        })
        }
    }, [error,isAuthenticated,dispatch,navigate])

  return (
    <>
        <MetaData title={`Login`}/>
        <div className="row wrapper">  
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}} autoComplete=''
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}} autoComplete=''
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">New User?</Link>
          </form>
		  </div>
        </div>
    </>
  )
}

export default Login
