import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Home from './Home';
import Forgot from './ForgotPassword';
import Dashboard from './DashBroad'; // Ensure the correct name is imported

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/dashboard" element={<Dashboard/>} /> {/* Updated path and component name */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
