import React from 'react';
import Filter from '../Filter/Filter.jsx';
import Logout from '../Logout/Logout.jsx';
import dogFinderh from '../../images/dog-finderh.png';
const Home = () => {

  return (
    <div className='main-container'>
      <div className='title-logout-container'>
        <div className='title-logo-container'>
          <div className='dogfinder-logo'>
            <img src={dogFinderh} alt='dog finder' />
          </div>
          <h4 className="text-2xl font-bold">
            Adopt a Dog!
          </h4>

        </div>
        <div className='logout-container'>
          <Logout />
        </div>
      </div>
      <Filter />
    </div>
  );
};

export default Home;
