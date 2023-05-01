import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ChatBotWidget from '../components/ChatBot/ChatBotWidget';
import "../styles/mix.css"
const Dashboard = () => {

  const navigate = useNavigate();

  const userValid = () => {
    let token = localStorage.getItem("userdbtoken");
    if (token) {
      console.log("user valid")
      navigate('/dashboard')
    } else {
      navigate("/register")
    }
  }

  useEffect(() => {
    userValid();
  }, [])
  return (
    <div className='d-board'>
      <h2 >Ask your questions here</h2>
      <ChatBotWidget />
    </div>

  )
}

export default Dashboard