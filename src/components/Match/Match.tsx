import React from 'react';
import { Dog } from '../../types'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
interface MatchProps {
  handleMatchButton: () => void,
  hasLikedDogs: boolean,
}
const Match = ({ handleMatchButton, hasLikedDogs }: MatchProps) => {
  const navigate = useNavigate();
  const match: Dog = useSelector((state: RootState) => state.filter.match)
  const { img, breed, name, zip_code, age } = match;
  const handleClick = async () => {
    if (hasLikedDogs) {
      handleMatchButton();
    }
    const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }
  const handleRefresh = () => {
    if (!hasLikedDogs) {
      navigate('/home', { replace: true });
    }
  }

  return (
    <div className='dog-match-container'>
      <div className='border-2 border-blue-200 p-2'>
        <span className='md:font-bold max-w-xs break-normal'> After filtering the breeds and selecting your favorite dogs, click to find your match!</span>
        <button className="btn w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>Find a Match!</button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            {!hasLikedDogs ?
              <div>
                <h1>Please 'like' a few dogs you're interested in adopting first.</h1>
              </div>
              :
              <div>
                <div className="card card-compact bg-base-100 shadow-xl">
                  <figure><img className='dog-image' src={img} alt={`image of ${breed}`} /></figure>
                  <div className="card-body">
                    <h2 className="card-title">Congratulations! You matched with {name}!</h2>
                    <p>Breed: {breed} </p>
                    <p>Age: {age} </p>
                    <p>Zip: {zip_code} </p>
                    <div className="card-actions justify-end">
                    </div>
                  </div>
                </div>
              </div>}
            <form method="dialog" className="modal-backdrop">
              <button className="btn" onClick={handleRefresh}>close</button>
            </form>
          </div>
        </dialog>
      </div>
    </div >
  )
}
export default Match;