import React from "react";

export type Dog = {
  id: string,
  img: string,
  name: string,
  age: number,
  zip_code: string,
  breed: string,
}

export type LikeDog = {
  [key: string]: boolean,
}

export type SearchResult = {
  next: string,
  resultIds: string[],
  total: number,
  prev: string,
}

export type DogMatch = {
  match: string,
}

export type ToggleType = {
  toggle: string,
  setToggle: (toggle: string) => void,
}

export type Params = {
  sort: string,
  ageMin?: number | string,
  ageMax?: number | string,
  breeds?: string[],
  zipCodes?: string[],
  size?: number,
}

export type CheckedBreed = {
  [key: string]: boolean,
}
