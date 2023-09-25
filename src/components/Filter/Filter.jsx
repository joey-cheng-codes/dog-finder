import React, { useState, useEffect } from 'react';
import 'flowbite';

const Filter = () => {
  const [dogList, setDogList] = useState([]); // breed drop down 
  const [getDogInfo, setGetDogInfo] = useState([]); // dog info (all info)
  const [searchResult, setSearchResult] = useState({}); // display search result that contains next, resultIds, total

  const [breedSearchQuery, setBreedSearchQuery] = useState('');
  const [displayResult, setDisplayResult] = useState([]) // dogs of interest 
  const [filteredBreeds, setFilteredBreeds] = useState([]); // for the search bar ..

  const [zip, setZip] = useState('');

  const [minAge, setMinAge] = useState();
  const [maxAge, setMaxAge] = useState();

  const [size, setSize] = useState(25);

  const checkedBreeds = new Map(); // for keeping track of what has been checked marked on breeds. 
  const handleSearchInputChange = (e) => {
    const query = e.target.value
    setBreedSearchQuery(query);

    // Filter breeds based on the search query.
    const filtered = breeds.filter((breed) => breed.toLowerCase().includes(query.toLowerCase()));

    setFilteredBreeds(filtered);
  };

  const breeds = dogList;

  //Update this object of checked breeds 
  const handleCheckedBreeds = (e) => {
    //unchecking a box
    let breedName = e.target.name;
    // if the dog breed is already in the object, we will be unchecking it by setting it to false.  
    if (checkedBreeds.get(breedName)) {
      checkedBreeds.delete(breedName);
    }
    //checking a box
    else {
      checkedBreeds.set(breedName, true);
    }
  };



  useEffect(() => {
    const getBreeds = async () => {
      try {
        const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setDogList(data);
          setFilteredBreeds(data);
        }
      }
      catch (err) {
        console.error(err, 'could not get breed information');
      }
    };

    getBreeds();
  }, []);
  // breed dropdown list
  const listDog = (dog, index) => {
    return (
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input key={index} id="checkbox-item-11" type="checkbox" value="" name={dog} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onClick={handleCheckedBreeds} />
          <label htmlFor="checkbox-item-11" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{dog}</label>
        </div>
      </li>

    );
  };

  const dogSample = [{
    age: 10,
    breed: 'Chihuahua',
    id: 'jnGFTIcBOvEgQ5OCx40W',
    img:
      'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_2973.jpg',
    name:
      'Laurianne',
    zip_code:
      '67218'
  }];

  // input field for zip code handler
  const handleZipcodeInput = (e) => {
    setZip(e.target.value);
  }

  //age 
  const handleMinAgeInput = (e) => {
    setMinAge(e.target.value);
  }
  const handleMaxAgeInput = (e) => {
    setMaxAge(e.target.value);
  }

  // next page
  const handleNextPage = (e) => {
    e.preventDefault();
    return filteredDogs(e, searchResult.next)
  }

  // get next, prev, total and resultIds of the dog filter. 
  const filteredDogs = async (e, paramsEnd = 'dogs/search?') => {
    e.preventDefault();
    try {
      if (paramsEnd !==
        '') {
        const params = {};

        const breedResult = Array.from(checkedBreeds.keys());
        if (breedResult.length !== 0) {
          params.breeds = breedResult;
        }
        const validZipTest = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        if (validZipTest.test(zip)) {
          params.zipCodes = [zip];
        }
        else if (zip !== '') {
          alert('invalid zip code entry');
        }

        if (minAge >= 0) {
          params.ageMin = minAge;
        }

        if (maxAge > 0) {
          params.ageMax = maxAge;
        }

        if (size < 25) {
          params.size = size;
        }
        const encodeGetParams = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

        paramsEnd = 'dogs/search?' + encodeGetParams(params);

      }

      const response = await fetch(`https://frontend-take-home-service.fetch.com/${paramsEnd}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setSearchResult(data);
        console.log(paramsEnd, 'what does params look like?')
        console.log(data, 'what does searchResult look like?????')
        if (Object.keys(data).length === 0) {
          console.log('No matches found based on your search criteria. Please try again.')
        }
        return getDogs(data);
      }
    }
    catch (err) {
      console.error(err, 'An error has occured. Failed to filter dogs result.');
    }
  };

  // give the ids of the dogs of interest? 
  const getDogs = async (searchResult) => {

    try {
      const arr = await searchResult.resultIds;
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(arr),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data, 'data from getDogs ********');
        setGetDogInfo(data);
      }
    }
    catch (err) {
      console.error(err, 'error getting dogs');
    }
  };
  const displayDog = (dogObj, index) => {
    return (
      <div><h2 key={index}>hello {dogObj.id} {dogObj.age}</h2>
        <img src={dogObj.img} />
      </div>
    );
  };

  return (
    <div >
      <h2 className="text-2xl font-bold">
        Share your dog preferences and get matched!
      </h2>
      <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Select Breeds <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
      </svg></button>

      {/* <!-- Dropdown menu --> */}
      <div id="dropdownSearch" className="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
        <div className="p-3">
          <label htmlFor="input-group-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="input-group-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search breed type" onChange={handleSearchInputChange} value={breedSearchQuery} />
          </div>
        </div>
        <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
          {/* updates the search bar as you type in the breed of interest */}
          {filteredBreeds.map((dog, index) => {
            return (
              listDog(dog, index)
            );
          })}
        </ul>
      </div>
      <form onSubmit={(e) => filteredDogs(e, paramsEnd)}>
        <div className="form-control w-full max-w-xs">
          {/* zipcode */}
          <label className="label">
            <span className="label-text">Filter dogs by zipcode</span>
          </label>
          <input onChange={handleZipcodeInput} value={zip} type="text" pattern="[0-9]{5}" placeholder="zipcode" className="input input-bordered w-full max-w-xs" />
          {/* min age */}
          <label className="label">
            <span className="label-text">Min Age Requirement</span>
          </label>
          <input onChange={handleMinAgeInput} value={minAge} type="number" min="0" max="99" placeholder="minimum age" className="input input-bordered w-full max-w-xs" />
          {/* max age */}
          <label className="label">
            <span className="label-text">Max Age Requirement</span>
          </label>
          <input onChange={handleMaxAgeInput} value={maxAge} type="number" min="0" max="99" placeholder="maxiumum age" className="input input-bordered w-full max-w-xs" />
        </div>
        <div>
          <button type='submit' className="btn btn-wide">show me my matches</button>
        </div>
      </form>
      {getDogInfo.length > 0 && (getDogInfo.map(displayDog))}
      {/* Pagination starts */}
      <div className="flex flex-col items-center">
        {/* <!-- Help text --> */}
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to <span className="font-semibold text-gray-900 dark:text-white">25
          </span> of <span className="font-semibold text-gray-900 dark:text-white">{searchResult.total}</span> Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          {/* <!-- Buttons --> */}
          <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
            </svg>
            Prev
          </button>
          <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={(e) => { handleNextPage(e) }}>
            Next
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </div>
        {/* Pagination ends */}
      </div>

    </div >
  );
};

export default Filter;
