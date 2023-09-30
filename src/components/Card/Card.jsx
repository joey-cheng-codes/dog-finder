import React from 'react';
import emptyHeart from '../../images/empty-heart.svg';
import redHeart from '../../images/red-heart.svg';

const Card = ({ dogObj, index, likeDogs, setLikeDogs }) => {
  const { id, breed, age, zip_code, name, img } = dogObj;
  let heart = emptyHeart;
  const handleMatch = () => {
    if (heart === emptyHeart) {
      if (!likeDogs[id]) { }
      const updatedLikeDogs = { ...likeDogs, [id]: true }
      setLikeDogs(updatedLikeDogs)
    }
    else {
      const updatedLikeDogs = { ...likeDogs }
      delete updatedLikeDogs[id]
      setLikeDogs(updatedLikeDogs)
    }
  }

  return (
    <div key={`dog-${index}`} className="card card-compact bg-base-100 shadow-xl" >
      <figure className='dog-image-container' ><img className='dog-image' src={img} alt={`image of ${breed} name ${name}`} /></figure>
      <div className="card-body">
        <div className='card-info'>
          <h2 className="card-title">{name}</h2>
          <p>Breed: {breed}</p>
          <p>Age: {age}</p>
          <p>Zip Code: {zip_code}</p>
        </div>
        <div className='heart-container'>
          <img className='heart-button' src={likeDogs[id] ? heart = redHeart : heart = emptyHeart} alt='like button in the shape of a heart to favorite dogs' onClick={handleMatch} />
        </div>
        <div className="card-actions justify-end">
        </div>
      </div>
    </div >
  )
}
export default Card;