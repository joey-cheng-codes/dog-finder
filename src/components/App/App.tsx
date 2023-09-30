import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Home from '../Home/Home';
import NoMatch from '../NoMatch/NoMatch';

const App = () => {

  return (
    <div>
      <h1>Hello world! I am using React</h1>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default App;