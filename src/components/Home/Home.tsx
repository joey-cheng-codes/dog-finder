import React from 'react';
import Filter from '../Filter/Filter';
import Logout from '../Logout/Logout';
import dogFinderh from '../../images/dog-finderh.png';
const Home = () => {

  return (
    <div className='main-container'>
      <div className='title-logout-container'>
        <div className='title-logo-container'>
          <div className='dogfinder-logo'>
            <img src={dogFinderh} alt='dog finder' />
          </div>
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
