export type Dog = {
  id: string,
  img: string,
  name: string,
  age: number,
  zip_code: string,
  breed: string,
};

export type LikeDog = {
  [key: string]: boolean,
};

export type SearchResult = {
  next: string,
  resultIds: string[],
  total: number,
  prev: string,
};

export type DogMatch = {
  match: string,
};

export type Params = {
  sort: string,
  ageMin?: string,
  ageMax?: string,
  breeds?: string[],
  zipCodes?: string[],
  size?: number,
};

export type CheckedBreed = {
  [key: string]: boolean,
};
