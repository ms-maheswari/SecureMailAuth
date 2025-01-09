import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {

  const navigate = useNavigate();

  const userValid = () => {
    let token = localStorage.getItem("userdbtoken");
    if (token) {
      console.log("user valid")
    } else {
      navigate("*")
    }
  }

  useEffect(() => {
    userValid();
  }, [])
  return (
    <div>
      <h1 className='p-12 m-12 text-xl font-bold text-center'>Welcome to our page</h1>  
    </div>
  )
}

export default Dashboard