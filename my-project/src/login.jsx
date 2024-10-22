import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Set axios default to include credentials for cookie handling
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear error message on new submission

    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });

      // Check if login is successful and navigate to the home page
      if (response.data.status) {
        navigate('/');
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>

        {/* Error Message Display */}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging in...' : 'Submit'}
          </button>
        </div>
        <p className="mt-4 text-center">
          forgot password? <Link to="/forgot" className="text-blue-500">forgot</Link>
        </p>

        <p className="mt-4 text-center">
          Create New Account? <Link to="/signup" className="text-blue-500">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
