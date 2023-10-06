import React, { useState, useEffect } from 'react';
import CardHolder from '../CardHolder/CardHolder';
import Match from '../Match/Match';
import Pagination from '../Pagination/Pagination';
import Toggle from '../Toggle/Toggle';
import 'flowbite';
import { LikeDog, SearchResult, DogMatch, Params, CheckedBreed, Dog } from '../../types'
import { useNavigate } from 'react-router-dom';

const Filter = () => {
  const navigate = useNavigate();
  const [dogList, setDogList] = useState([]); // breed drop down 
  const [getDogInfo, setGetDogInfo] = useState([]); // dog info (all info)
  const [searchResult, setSearchResult] = useState<SearchResult>({
    next: '',
    resultIds: [],
    total: 0,
    prev: '',
  }); // display search result that contains next, resultIds, total

  const [breedSearchQuery, setBreedSearchQuery] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState([]); // for the search bar ..

  const [zip, setZip] = useState('');

  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');

  const [from, setFrom] = useState(0);

  const [toggle, setToggle] = useState('asc');
  const [checkedBreeds, setCheckedBreeds] = useState<CheckedBreed>({}) // for keeping track of what has been checked marked on breeds. 
  const [likeDogs, setLikeDogs] = useState({}); // for keeping track of dogs we like
  const [match, setMatch] = useState<Dog>({
    id: '',
    img: '',
    name: '',
    age: 0,
    zip_code: '',
    breed: '',
  }); // object of match dog
  const size = 25;
  const breeds = dogList;
  let paramsEnd = '';

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setBreedSearchQuery(query);

    // Filter breeds based on the search query.
    const filtered = breeds.filter((breed) => breed.toLowerCase().includes(query.toLowerCase()));

    setFilteredBreeds(filtered);
  };


  //Update this object of checked breeds 
  const handleCheckedBreeds = (e: React.ChangeEvent<HTMLInputElement>) => {
    //unchecking a box
    let breedName = e.target.name;
    // if the dog breed is already in the object, we will be removing it from the object
    if (checkedBreeds[breedName]) {
      delete checkedBreeds[breedName];
      setCheckedBreeds({ ...checkedBreeds });
    }
    //checking a box
    else {
      checkedBreeds[breedName] = true;
      setCheckedBreeds({ ...checkedBreeds });
    }
  };



  useEffect(() => {
    const getBreeds = async () => {
      try {
        const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.status == 401) {
          navigate('/', { replace: true });
        }
        const data = await response.json();
        if (response.ok) {
          console.log(data, 'is getting breeds working?');
          setDogList(data);
          setFilteredBreeds(data);
        }
        else {
          throw new Error('An error has occurred. Could not get breed information.')
        }
      }
      catch (err) {
        console.error(err, 'Could not get breed information');
      }
    };

    getBreeds();
  }, []);
  // breed dropdown list
  const listDog = (dog: string, index: number) => {
    return (
      <li key={dog}>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id={`checkbox-item-${index}`} type="checkbox" value="" name={dog} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-green-600 dark:ring-offset-green-700 dark:focus:ring-offset-green-700 focus:ring-2 dark:bg-green-600 dark:border-green-500" onChange={handleCheckedBreeds} />
          <label htmlFor={`checkbox-item-${index}`} className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{dog}</label>
        </div>
      </li>

    );
  };
  // input field for zip code handler
  const handleZipcodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZip(e.target.value);
  }

  //age 
  const handleMinAgeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinAge(e.target.value);
  }
  const handleMaxAgeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxAge(e.target.value);
  }

  // next page
  const handleNextPage = () => {
    if (searchResult.total > from) {
      setFrom(from + 25)
      paramsEnd = searchResult.next;
      return filteredDogs();
    }
  };

  // prev page
  const handlePrevPage = () => {
    if (from >= 25) {
      setFrom(from - 25)
      paramsEnd = searchResult.prev;
      return filteredDogs();
    }
  };

  //handle form submission
  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (getDogInfo.length === 0) {
    // paramsEnd = '';
    // }
    filteredDogs();
  }


  const adjustParams = () => {
    const params: Params = {
      sort: `breed:${toggle}`
    };

    const breedResult = Object.keys(checkedBreeds);
    let breedString = ''
    if (breedResult.length !== 0) {
      breedResult.forEach((breed, index) => {
        let newBreed = breed.split(" ").join('%20');
        if (index < breedResult.length - 1) {
          breedString += `breeds%5B${index}%5D=${newBreed}&`
        }
        else {
          breedString += `breeds%5B${index}%5D=${newBreed}`
        }
      })
    }
    const validZipTest = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (validZipTest.test(zip)) {
      params.zipCodes = [zip];
    }
    else if (zip !== '') {
      alert('invalid zip code entry');
    }

    if (Number(minAge) >= 0) {
      params.ageMin = minAge;
    }

    if (Number(maxAge) > 0) {
      params.ageMax = maxAge;
    }

    if (size < 25) {
      params.size = size;
    }

    const encodeGetParams = (p: Record<string, any>) => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

    let paramsEnd = '/dogs/search?' + encodeGetParams(params)
    if (breedString !== '') {
      paramsEnd += `&${breedString}`
    }
    return paramsEnd;
  }

  // get next, prev, total and resultIds of the dog filter.
  const filteredDogs = async () => {
    try {
      if (paramsEnd === '') {
        paramsEnd = adjustParams();
      }
      const response = await fetch(`https://frontend-take-home-service.fetch.com${paramsEnd}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setSearchResult(data);
        return getDogs(data);
      }
      else {
        throw new Error('An error has occurred. Failed to filter dog result.')
      }
    }
    catch (err) {
      console.error(err, 'An error has occured. Failed to filter dogs result.');
    }
  };

  const getDogs = async (searchResult: SearchResult) => {
    try {
      const arr = searchResult.resultIds;
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
        setGetDogInfo(data);
      }
      else {
        throw new Error('An error has occurred. Failed to get dog information.')
      }
    }
    catch (err) {
      console.error(err, 'error getting dogs');
    }
  };

  useEffect(() => {
    filteredDogs();
  }, [toggle]);


  const getMatch = async (likeDogs: LikeDog) => {
    try {
      const dogIdArr = Object.keys(likeDogs);
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dogIdArr)
      })
      const data = await response.json();
      if (response.ok) {
        await getSingleMatch(data);
      }
      else {
        throw new Error('An error has occurred. Failed to match dog.')
      }
    }
    catch (err) {
      console.error(err, 'Error getting a match for dog')
    }
  };

  const getSingleMatch = async (dogMatch: DogMatch) => {
    try {
      const matchId = dogMatch.match
      const arr = [matchId]
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
        setMatch(data[0]);
      }
      else {
        throw new Error('An error has occurred. Failed to get a match to dream dog.')
      }
    }
    catch (err) {
      console.error(err, 'error getting match of dream dog');
    }
  };
  // match page
  const handleMatchButton = async () => {
    await getMatch(likeDogs);
  };

  return (
    <div >
      <div className='filter-card-container'>
        <div className='filter-container min-w-max'>
          <div className='toggle-container'>
            <Toggle toggle={toggle} setToggle={setToggle} />
          </div>
          <h3 className='md:font-bold text-black-700'> Enter your preferences:</h3>
          <div className='form-selection border-2 border-blue-200 p-2'>
            <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-800 dark:focus:ring-green-800" type="button">Choose Breeds<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
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
                  <input type="text" id="input-group-search" className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5  dark:bg-green-600 dark:border-green-500 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search breed type" onChange={handleSearchInputChange} value={breedSearchQuery} />
                </div>
              </div>
              <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-green-700 dark:text-green-200" aria-labelledby="dropdownSearchButton">
                {/* updates the search bar as you type in the breed of interest */}
                {filteredBreeds.map((dog, index) => {
                  return (
                    listDog(dog, index)
                  );
                })}
              </ul>
            </div>
            <form onSubmit={handleFormSubmission}>
              <div className="form-control w-full max-w-xs">
                {/* min age */}
                <label className="filter-label">
                  <span className="label-text">Minimum Age</span>
                </label>
                <input onChange={handleMinAgeInput} value={minAge} type="number" min="0" max="14" placeholder="Minimum Age" className="input input-bordered w-full max-w-xs" />
                {/* max age */}
                <label className="filter-label">
                  <span className="label-text">Maximum Age</span>
                </label>
                <input onChange={handleMaxAgeInput} value={maxAge} type="number" min="1" max="14" placeholder="Maximum Age" className="input input-bordered w-full max-w-xs" />
                {/* zipcode */}
                <label className="filter-label">
                  <span className="label-text">Zip Code</span>
                </label>
                <input onChange={handleZipcodeInput} value={zip} type="text" pattern="[0-9]{5}" placeholder="Zip Code" className="input input-bordered w-full max-w-xs" />
              </div>
              <div className='filter-result-btn-container'>
                <button type='submit' className="btn w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Filter Breeds</button>
              </div>
            </form>
          </div>
          <Pagination from={from} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} searchResult={searchResult} />
          <div>
            <div className='text-container min-w-max'>
              <Match
                match={match}
                handleMatchButton={handleMatchButton}
                hasLikedDogs={Object.keys(likeDogs).length > 0}
              />
            </div>
          </div>
        </div>
        {
          // getDogInfo.length > 0 ? (
          <div className='filter-card-container'>
            <CardHolder getDogInfo={getDogInfo} likeDogs={likeDogs} setLikeDogs={setLikeDogs} />
          </div>
          // ) : (
          //   <div className='no-match-container'>
          //     <h1>No matches were found with this search.</h1>
          //     <h1>Please try again.</h1>
          //   </div>
          // )
        }
      </div >
    </div >
  );
};

export default Filter;
