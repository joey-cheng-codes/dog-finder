import React from 'react';
import Filter from '../Filter/Filter.jsx';

const Home = () => {

  return (
    <div className='main-container'>
      <h1 className="text-2xl font-bold">
        Adopt a Dog!
      </h1>
      <h4>Logout</h4>
      <Filter />
    </div>
  );
};

export default Home;
