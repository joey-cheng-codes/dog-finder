import React from 'react';
import Card from '../Card/Card'
import { Dog, LikeDog } from '../../types';

interface CardHolderProps {
  getDogInfo: Dog[],
  likeDogs: LikeDog,
  setLikeDogs: (likeDogs: LikeDog) => void;
}


const CardHolder = ({ getDogInfo, likeDogs, setLikeDogs }: CardHolderProps) => {

  const displayDog = (dogObj: Dog, index: number) => {
    return (
      <Card dogObj={dogObj} key={`card-${index}`} likeDogs={likeDogs} setLikeDogs={setLikeDogs} />
    );
  };
  return (
    <div className='card-container'>
      {getDogInfo.length > 0 && (getDogInfo.map(displayDog))}
    </div>
  )
}
export default CardHolder;