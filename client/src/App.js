import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Otp from './pages/Otp';
import { Routes, Route } from "react-router-dom"

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/user/otp' element={<Otp />} />
      </Routes>
    </>
  );
}

export default App;
