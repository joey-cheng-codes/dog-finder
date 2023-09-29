import React from 'react';
import Filter from '../Filter/Filter.jsx';
import Logout from '../Logout/Logout.jsx';
const Home = () => {

  return (
    <div className='main-container'>
      <div className='title-logout-container'>
        <h1 className="text-2xl font-bold">
          Adopt a Dog!
        </h1>
        <Logout />
      </div>
      <Filter />
    </div>
  );
};

export default Home;
