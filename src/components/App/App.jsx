import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login/Login.jsx';
import Home from '../Home/Home.jsx';
import NoMatch from '../NoMatch/NoMatch.jsx';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </div>
  )
};

export default App;