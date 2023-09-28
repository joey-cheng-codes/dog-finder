import React, { useState } from 'react';
import emptyHeart from '../../images/empty-heart.svg';
import redHeart from '../../images/red-heart.svg';

const Card = ({ dogObj, index, match, setMatch }) => {

  // const [match, setMatch] = useState({});
  let heart = emptyHeart;
  const handleMatch = () => {
    if (heart === emptyHeart) {
      if (!match[dogObj.id]) {
        match[dogObj.id] = true;
        setMatch({ ...match })
      }
    }
    else {
      delete match[dogObj.id]
      setMatch({ ...match })
    }
  }

  return (
    <div key={`dog-${index}`} className="card card-compact w-96 bg-base-100 shadow-xl" >
      <figure className='dog-image-container' ><img className='dog-image' src={dogObj.img} alt={`image of ${dogObj.breed} name ${dogObj.name}`} /></figure>
      <div className="card-body">
        <div className='heart-container'>
          <img className='heart-button' src={match[dogObj.id] ? heart = redHeart : heart = emptyHeart} alt='like button in the shape of a heart to favorite dogs' onClick={(e) => { handleMatch(e) }} />
        </div>
        <div className='card-info'>
          <h2 className="card-title">{dogObj.name}</h2>
          <p>Breed: {dogObj.breed}</p>
          <p>Age: {dogObj.age}</p>
          <p>Zip Code: {dogObj[`zip_code`]}</p>
        </div>
        <div className="card-actions justify-end">
        </div>
      </div>
    </div >
  )
}
export default Card;