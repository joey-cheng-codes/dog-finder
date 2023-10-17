import React from 'react';
import emptyHeart from '../../images/empty-heart.svg';
import redHeart from '../../images/red-heart.svg';
import { Dog, LikeDog } from '../../types';
import { setLikeDogs, } from '../../features/filterSlicer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
interface CardProps {
  dogObj: Dog;
};

const Card = ({ dogObj }: CardProps) => {
  const dispatch = useDispatch();
  const likeDogs: LikeDog = useSelector((state: RootState) => state.filter.likeDogs);
  const getDogInfo = useSelector((state: RootState) => state.filter.getDogInfo);
  const { id, breed, age, zip_code, name, img } = dogObj;
  let isLiked: boolean = likeDogs[id];
  const handleMatch = (): void => {
    if (!isLiked) {
      const updatedLikeDogs = { ...likeDogs, [id]: true };
      dispatch(setLikeDogs(updatedLikeDogs));
    }
    else {
      const updatedLikeDogs = { ...likeDogs }
      delete updatedLikeDogs[id];
      dispatch(setLikeDogs(updatedLikeDogs));
    }
  }

  return (
    <div key={id} className="card card-compact bg-base-100 shadow-xl" >
      <figure className='dog-image-container' ><img className='dog-image' src={img} alt={`image of ${breed} name ${name}`} /></figure>
      <div className="card-body">
        <div className='card-info'>
          <h2 className="card-title">{name}</h2>
          <p>Breed: {breed}</p>
          <p>Age: {age}</p>
          <p>Zip Code: {zip_code}</p>
        </div>
        <div className='heart-container'>
          <button><img className='heart-button' src={isLiked ? redHeart : emptyHeart} alt='like button in the shape of a heart to favorite dogs' onClick={handleMatch} /></button>
        </div>
        <div className="card-actions justify-end">
        </div>
      </div>
    </div >
  )
}
export default Card;