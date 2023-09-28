import React, { useState } from 'react';
import emptyHeart from '../../images/empty-heart.svg';
import redHeart from '../../images/red-heart.svg';

const Card = ({ dogObj, index }) => {
  const [heart, setHeart] = useState(emptyHeart);
  const [match, setMatch] = useState([]);
  const handleHeartClick = () => {
    if (heart === emptyHeart) {
      setHeart(redHeart);
    }
    else {
      setHeart(emptyHeart);
    }
  }
  const handleMatch = () => {
    if (heart === emptyHeart) {
      if (!match.includes(dogObj.id)) {
        setMatch((prevState) => {
          return [...prevState, dogObj['id']]
        })
      }
      console.log(match, 'see if adding match is working')
    }
    else {
      const filtered = match.filter((dogId) => {
        dogId !== dogObj.id
      })
      setMatch(filtered)
      console.log(dogObj, match, 'see if removing match is working')
    }
  }
  return (
    <div key={`dog-${index}`} className="card card-compact w-96 bg-base-100 shadow-xl" >
      <figure className='dog-image-container' ><img className='dog-image' src={dogObj.img} alt={`image of ${dogObj.breed} name ${dogObj.name}`} /></figure>
      <div className="card-body">
        <div className='heart-container'>
          <img className='heart-button' src={heart} alt='like button in the shape of a heart to favorite dogs' onClick={(e) => { handleHeartClick(e); handleMatch(e) }} />
          {/* <button className="btn btn-primary">Favorite This Dog</button> */}
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