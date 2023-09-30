import React from 'react';
import Card from '../Card/Card.tsx'

const CardHolder = ({ getDogInfo, likeDogs, setLikeDogs }) => {

  const displayDog = (dogObj, index) => {
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