import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login/Login.jsx';
import Home from '../Home/Home';
import NoMatch from '../NoMatch/NoMatch';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </div>
  );
};

export default App;