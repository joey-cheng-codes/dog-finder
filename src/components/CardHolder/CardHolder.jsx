import React from 'react';
import Card from '../Card/Card.jsx'

const CardHolder = ({ getDogInfo, match, setMatch }) => {

  const displayDog = (dogObj, index) => {
    return (
      <Card dogObj={dogObj} key={`card-${index}`} match={match} setMatch={setMatch} />
    );
  };
  return (
    <div className='card-container'>
      {getDogInfo.length > 0 && (getDogInfo.map(displayDog))}
    </div>
  )
}
export default CardHolder;