import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const exit = async () => {
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        navigate('/', { replace: true });
      }
      else {
        throw new Error('An error has occurred. Failed to logout.');
      }
    }
    catch (err) {
      console.error(err, 'Error logging out. Please try again.')
    }
  }
  const handleLogout = () => {
    return exit();
  }
  return (
    <button onClick={handleLogout} className='logout-text'>Logout</button>
  )
}
export default Logout;