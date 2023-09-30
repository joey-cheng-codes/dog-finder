import React from 'react';

const Match = ({ match, handleMatchButton, hasLikedDogs }) => {
  const { img, breed, name, zip_code, age } = match;
  const handleClick = async () => {
    if (hasLikedDogs) {
      await handleMatchButton();
    }
    document.getElementById('my_modal_2').showModal();
  }

  return (
    <div className='dog-match-container'>
      <button className="btn btn-wide bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>Find a Match!</button>
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
            <button className="btn">close</button>
          </form>
        </div>
      </dialog>
    </div >
  )
}
export default Match;