import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex justify-center'>
      <button className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'>
        <Link to="/dashboard">Dashboard</Link>
      </button>
      <br />
      <button className='bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded ml-2'>
        <Link to="/logout">Logout</Link>
      </button>
    </div>
  );
};

export default Home;
