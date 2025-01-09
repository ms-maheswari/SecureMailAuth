import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { sentOtpFunction } from "../services/Apis";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  const sendOtp = async (e) => {
    e.preventDefault();

    // if (email === "" || !regex.test(email)) {
    //   toast.error("Enter a Valid Email!");
    // } 
      
      try {
        const data = { email };
       
        const response = await sentOtpFunction(data);
        if (response.status === 200) {
         
          navigate("/user/otp", { state: email });
        } else {
          toast.error(response.response?.data?.error || "Something went wrong.");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred. Please try again.");
      }
    
  };

  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-blue-800">Welcome Back, Log In</h1>
          <p className="text-gray-500 mt-2">Hi, we are glad you are back. Please login.</p>
          <form className="mt-6" onSubmit={sendOtp}>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent mb-4"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Address"
              value={email}
            />
          
           <button type='submit' className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition-all">Login</button>
           
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <NavLink to="/register" className="text-blue-500">
                Sign up
              </NavLink>
            </p>
          </form>
        </div>
        <ToastContainer autoClose={2000} />
      </section>
    </>
  );
};

export default Login;
