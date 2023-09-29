import React, { useState } from 'react';
import emptyHeart from '../../images/empty-heart.svg';
import redHeart from '../../images/red-heart.svg';

const Card = ({ dogObj, index, likeDogs, setLikeDogs }) => {

  let heart = emptyHeart;
  const handleMatch = () => {
    if (heart === emptyHeart) {
      if (!likeDogs[dogObj.id]) {
        likeDogs[dogObj.id] = true;
        setLikeDogs({ ...likeDogs })
      }
    }
    else {
      delete setLikeDogs[dogObj.id]
      setLikeDogs({ ...likeDogs })
    }
  }

  return (
    <div key={`dog-${index}`} className="card card-compact w-96 bg-base-100 shadow-xl" >
      <figure className='dog-image-container' ><img className='dog-image' src={dogObj.img} alt={`image of ${dogObj.breed} name ${dogObj.name}`} /></figure>
      <div className="card-body">
        <div className='heart-container'>
          <img className='heart-button' src={likeDogs[dogObj.id] ? heart = redHeart : heart = emptyHeart} alt='like button in the shape of a heart to favorite dogs' onClick={(e) => { handleMatch(e) }} />
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