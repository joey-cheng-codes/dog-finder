import React from 'react';

const Logout = () => {
  const exit = async () => {
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com/auth/logout', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        window.location.replace('/');
      }
    }
    catch (err) {
      console.error(err, 'Error logging out. Please try again.')
    }
  }
  const handleLogout = () => {
    return exit()
  }
  return (
    <button onClick={handleLogout} className='logout-text'>Logout</button>
  )
}
export default Logout