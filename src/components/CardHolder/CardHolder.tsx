import React from 'react';
import Card from '../Card/Card'
import { Dog, LikeDog } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


// interface CardHolderProps {
//   getDogInfo: Dog[],
//   likeDogs: LikeDog,
//   setLikeDogs: (likeDogs: LikeDog) => void;
// }


const CardHolder = () => {
  const getDogInfo = useSelector((state: RootState) => state.filter.getDogInfo)
  return (
    <div className='card-container'>
      {getDogInfo.length > 0 && getDogInfo.map((dogObj: Dog, index: number) => (
        <Card dogObj={dogObj} key={`card-${index}`} />
      ))}
    </div>
  )
}
export default CardHolder;