import React, { useState } from 'react';
import dogFinder1 from '../../images/dog-finder1.png'


const Login = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          name: fullName,
          email: email,

        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        window.location.replace('/home');
      }
    }
    catch (err) {
      console.error(err, 'Cannot login. Please try again.');
      window.location.replace('/');
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setEmail(e.target.value);
  };
  const handleFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setFullName(e.target.value);
  };

  return (
    <div>
      <div data-theme='light' >
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-opacity-100">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className='logo-header-container'>
              <img className="mx-auto h-100 w-auto" src={dogFinder1} alt="Fetch Rewards" />
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={loginHandler}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <input onChange={handleEmail} placeholder='email address' id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                <div className="mt-2">
                  <input onChange={handleFullName} placeholder='full name' id="name" name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  );
};

export default Login;
