import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { registerfunction } from "../services/Apis";
import { useNavigate } from "react-router-dom"
import { NavLink } from 'react-router-dom';
const Register = () => {
  const [passhow, setPassShow] = useState(false);
  const [inputdata, setInputdata] = useState({
    fname: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, password } = inputdata;
    if (fname === "") {
      toast.error("Enter Your Name");
    } else if (email === "") {
      toast.error("Enter Your Email");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email");
    } else if (password === "") {
      toast.error("Enter Your Password");
    } else if (password.length < 6) {
      toast.error("Password length minimum 6 characters");
    } else {
      const response = await registerfunction(inputdata);
      if (response.status === 200) {
        setInputdata({ fname: "", email: "", password: "" });
        navigate("/");
      } else {
        toast.error(response.response.data.error);
      }
    }
  }

  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-blue-800">Sign Up</h1>
          <p className="text-gray-500 mt-2 text-center">We are glad that you will be using Project Cloud to manage your tasks!</p>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Name</label>
              <input 
                type="text" 
                name="fname" 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                onChange={handleChange} 
                placeholder="Enter Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                onChange={handleChange} 
                placeholder="Enter Your Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Password</label>
              <div className="relative">
                <input 
                  type={!passhow ? "password" : "text"} 
                  name="password"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  onChange={handleChange} 
                  placeholder="Enter Your Password"
                />
                <span 
                  className="absolute right-3 top-3 cursor-pointer text-sm font-medium text-gray-600"
                  onClick={() => setPassShow(!passhow)}>
                  {!passhow ? "Show" : "Hide"}
                </span>
              </div>
            </div>
            <button className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition-all">Sign Up</button>
            <p className="text-center mt-4">Already have an account? <NavLink to="/" className="text-blue-500">Login</NavLink></p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}

export default Register
