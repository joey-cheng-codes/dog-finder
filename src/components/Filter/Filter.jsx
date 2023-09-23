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
  const [zipcodeArray, setZipcodeArray] = useState([]) // for zip code entries 

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
    console.log(e.target.name, 'handleCheckedBreeds')
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

  // get next, prev, total and resultIds of the dog filter. 
  const filteredDogs = async () => {
    try {
      // const ids = ['jnGFTIcBOvEgQ5OCx40W'];
      // const queryString = '?breeds=' + encodeURIComponent(JSON.stringify(ids));
      const breedResult = Array.from(checkedBreeds.keys());
      console.log(breedResult, ' breedResult');
      let new_params = '';
      if (breedResult.length !== 0) {
        new_params = new URLSearchParams(`breeds=${[...breedResult]}`);
      }
      const validZipTest = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
      if (validZipTest.test(zip)) {
        setZipcodeArray(...zipcodeArray, zip);
      }
      else {
        alert('invalid zip code entry');
      }
      const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${new_params}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setSearchResult(data);
        console.log(data, 'searchResult');
        // display the dog info from the id 
        return getDogs(data);
      }
    }
    catch (err) {
      console.error(err, 'failed to filter dogs result');
    }
  };

  // give the ids of the dogs of interest? 
  const getDogs = async (searchResult) => {

    try {
      const arr = await searchResult.resultIds;
      console.log(arr, ' arr of dog ids*********');
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
      <div><h2 key={index}>hello {dogObj.id}</h2>
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
      <div>
        <button onClick={() => { filteredDogs() }} className="btn btn-wide">show me my matches</button>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Filter dogs by zipcode(s)</span>
        </label>
        <input onChange={handleZipcodeInput} value={zip} type="text" pattern="[0-9]{5}" placeholder="zipcode" className="input input-bordered w-full max-w-xs" />
        {/* <label className="label"> */}
        {/* <span className="label-text-alt">Previous entries:</span> */}
        {/* <span className="label-text-alt">Bottom Right label</span> */}
        {/* </label> */}
        {/* <button>Filter by Zipcode(s)</button> */}
      </div>
      {getDogInfo.length > 0 && (getDogInfo.map(displayDog))}
    </div >
  );
};

export default Filter;
