import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { userVerify } from "../services/Apis"

const Otp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === "") {
      toast.error("Enter Your Otp");
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter Valid Otp");
    } else if (otp.length < 6) {
      toast.error("Otp Length minimum 6 digits");
    } else {
      const data = { otp, email: location.state };
      const response = await userVerify(data);
      if (response.status === 200) {
        localStorage.setItem("userdbtoken", response.data.userToken);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      } else {
        toast.error(response.response.data.error);
      }
    }
  }

  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-blue-800">Enter Your OTP</h1>
          <form className="mt-6" onSubmit={verifyOtp}>
            <label className="block text-lg font-medium mb-2">OTP</label>
            <input 
              type="text" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent mb-4"
              onChange={(e) => setOtp(e.target.value)} 
              placeholder="Enter Your OTP"
            />
            <button className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700 transition-all">Verify Otp</button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}

export default Otp
