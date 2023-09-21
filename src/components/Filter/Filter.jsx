import React, { useState, useEffect } from 'react';

const Filter = () => {
  const [dogList, setDogList] = useState([]); // breed drop down
  const [getDogInfo, setGetDogInfo] = useState([]); // dog info (all info)
  const [searchResult, setSearchResult] = useState([]); // display search result that contains next, resultIds, total
  useEffect(() => {
    const getBreeds = async () => {
      try {
        const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
          method: 'GET',
          credentials: 'include'
        })
        const data = await response.json();
        if (response.ok) {
          setDogList(data);
        }
      }
      catch (err) {
        console.error(err, 'could not get breed information')
      }
    }

    getBreeds();
  }, []);
  // breed dropdown list
  const listDog = (dog, index) => {
    return (
      <li>
        <button key={index} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{dog}</button>
      </li>
    )
  }
  // get next, prev, total and resultIds of the dog filter. 
  const filteredDogs = async () => {
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/search', {
        method: 'GET',
        credentials: 'include',
      })
      const data = await response.json();
      if (response.ok) {
        setSearchResult(data);
        console.log(data, 'searchResult')
        // display the dog info from the id 
        return getDogs();
      }
    }
    catch (err) {
      console.error(err, 'failed to filter dogs result')
    }
  };
  // give the ids of the dogs of interest? 
  const getDogs = async () => {
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          // resultIds: searchResult.resultIds,
          resultIds: ['jnGFTIcBOvEgQ5OCx40W', 'VXGFTIcBOvEgQ5OCx40W']
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data, 'data from getDogs ********')
        setGetDogInfo(data);
        console.log(getDogInfo, 'will you give me the getdoginfo???')
        return getDogInfo;
      }
    }
    catch (err) {
      console.error(err, 'error getting dogs')
    }
  }
  const displayDog = (id, index) => {
    return (
      <div key={index}>hello{id}</div>
    )
  }

  return (
    <div >
      <h1 className="text-3xl font-bold underline">
        Hello World
      </h1>
      <form>
        <div className="flex">
          <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
          <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">Select A Breed <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg></button>
          <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
              {dogList.map((dog, index) => {
                return (
                  listDog(dog, index)
                )
              })}
            </ul>
          </div>
          <div className="relative w-full">
            <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Dogs..." required />
            <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <button onClick={filteredDogs}>get search results</button>
      {getDogInfo.map((id, index) => {
        return (
          displayDog(id, index)
        )
      })}
    </div>
  )
};

export default Filter;
