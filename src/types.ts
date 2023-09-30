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
  resultIds: Dog[],
  total: number,
}