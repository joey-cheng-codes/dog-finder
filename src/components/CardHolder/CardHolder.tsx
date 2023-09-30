import React from 'react';
import Card from '../Card/Card'
import { Dog, LikeDog } from '../../types';

interface CardHolderArgs {
  getDogInfo: Dog[],
  likeDogs: LikeDog,
  setLikeDogs: (likeDogs: LikeDog) => void;
}


const CardHolder = ({ getDogInfo, likeDogs, setLikeDogs }: CardHolderArgs) => {

  const displayDog = (dogObj: Dog, index: Number) => {
    return (
      <Card dogObj={dogObj} index={index} key={`card-${index}`} likeDogs={likeDogs} setLikeDogs={setLikeDogs} />
    );
  };
  return (
    <div className='card-container'>
      {getDogInfo.length > 0 && (getDogInfo.map(displayDog))}
    </div>
  )
}
export default CardHolder;