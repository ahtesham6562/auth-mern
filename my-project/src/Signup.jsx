import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/signup', 
        { username, email, password }, 
        { withCredentials: true }  // Enable credentials if cookies are used
      );
      
      // Log the full response for debugging
      console.log('Response:', response);
      
      // Check response status
      if (response.data && response.data.status) {
        console.log('User created successfully, navigating to login');
        navigate('/login');
      } else {
        console.log('Unexpected response structure:', response);
        setErrorMessage('Signup was successful but the response structure is not as expected.');
      }
    } catch (error) {
      // Log the full error response
      if (error.response) {
        console.log('Error Response:', error.response);
        setErrorMessage(error.response.data.message);
      } else {
        console.log('Error:', error.message);
        setErrorMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Signup</h2>
        
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>} {/* Error message display */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            required
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMessage(''); // Clear error message on input change
            }}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            required
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage(''); // Clear error message on input change
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage(''); // Clear error message on input change
            }}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Submitting...' : 'Submit'} {/* Button text changes based on loading state */}
          </button>
        </div>
        
        <p className="mt-4 text-center">Have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
