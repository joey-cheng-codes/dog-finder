import React from 'react';
import Card from '../Card/Card.jsx'

const CardHolder = ({ getDogInfo }) => {

  const displayDog = (dogObj, index) => {
    return (
      <Card dogObj={dogObj} key={`card-${index}`} />
    );
  };
  return (
    <div className='card-container'>
      {getDogInfo.length > 0 && (getDogInfo.map(displayDog))}
    </div>
  )
}
export default CardHolder;