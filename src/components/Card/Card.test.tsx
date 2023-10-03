import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import Card from './Card';

const mockCardProps = {
  dogObj: {
    id: 'NXGFTIcBOvEgQ5OCx8A',
    breed: 'Affenpinscher',
    age: 13,
    zip_code: '21056',
    name: 'Yolanda',
    img: 'https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_10225.jpg'
  },
  likeDogs: {},
  setLikeDogs: jest.fn(),
}

test('render a Card component with information provided', () => {
  const { getByText } = render(<Card dogObj={mockCardProps.dogObj} likeDogs={mockCardProps.likeDogs} setLikeDogs={mockCardProps.setLikeDogs} />)

  const dogBreedType = getByText('Breed: Affenpinscher');
  const dogAge = getByText('Age: 13');
  const dogZip = getByText('Zip Code: 21056');
  const dogName = getByText('Yolanda');


  expect(dogBreedType).toBeInTheDocument;
  expect(dogAge).toBeInTheDocument;
  expect(dogZip).toBeInTheDocument;
  expect(dogName).toBeInTheDocument;
})