import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dog, SearchResult, CheckedBreed, LikeDog } from "../types";

interface FilterState {
  dogList: string[];
  getDogInfo: Dog[];
  searchResult: SearchResult;
  checkedBreeds: CheckedBreed;
  breedSearchQuery: string;
  filteredBreeds: string[];
  zip: string;
  minAge: string;
  maxAge: string;
  from: number;
  toggle: string;
  likeDogs: LikeDog;
  match: Dog;
};

const initialState: FilterState = {
  dogList: [],
  getDogInfo: [],
  searchResult: { // display search result that contains next, resultIds, total
    next: '',
    resultIds: [],
    total: 0,
    prev: '',
  },
  breedSearchQuery: '',
  filteredBreeds: [],
  zip: '',
  minAge: '',
  maxAge: '',
  from: 0,
  toggle: 'asc',
  checkedBreeds: {},
  likeDogs: {},
  match: {
    id: '',
    img: '',
    name: '',
    age: 0,
    zip_code: '',
    breed: '',
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setDogList: (state, action: PayloadAction<string[]>) => {
      state.dogList = action.payload;
    },
    setGetDogInfo: (state, action: PayloadAction<Dog[]>) => {
      state.getDogInfo = action.payload;
    },
    setSearchResult: (state, action: PayloadAction<SearchResult>) => {
      state.searchResult = action.payload;
    }, // display search result that contains next, resultIds, total
    setBreedSearchQuery: (state, action: PayloadAction<string>) => {
      state.breedSearchQuery = action.payload;
    },
    setFilteredBreeds: (state, action: PayloadAction<string[]>) => {
      state.filteredBreeds = action.payload;
    },
    setZip: (state, action: PayloadAction<string>) => {
      state.zip = action.payload;
    },
    setMinAge: (state, action: PayloadAction<string>) => {
      state.minAge = action.payload;
    },
    setMaxAge: (state, action: PayloadAction<string>) => {
      state.maxAge = action.payload;
    },
    setFrom: (state, action: PayloadAction<number>) => {
      state.from = action.payload;
    },
    setToggle: (state, action: PayloadAction<string>) => {
      state.toggle = action.payload;
    },
    setCheckedBreeds: (state, action: PayloadAction<CheckedBreed>) => {
      state.checkedBreeds = action.payload;
    },
    setLikeDogs: (state, action: PayloadAction<LikeDog>) => {
      state.likeDogs = action.payload;
    },
    setMatch: (state, action: PayloadAction<Dog>) => {
      state.match = action.payload;
    },
  }
});

export const { setDogList, setGetDogInfo, setSearchResult, setBreedSearchQuery, setFilteredBreeds, setZip, setMinAge, setMaxAge, setFrom, setToggle, setCheckedBreeds, setLikeDogs, setMatch } = filterSlice.actions;
export default filterSlice.reducer;