import React from 'react';

const Match = ({ match, handleMatchButton }) => {
  const { img, breed, name, zip_code, age } = match;
  return (
    <div className='dog-image-container'>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { document.getElementById('my_modal_5').showModal(); { handleMatchButton() } }} >Find a Match!</button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">We Found A Match!</h3>
          <img className='dog-image' src={img} alt={`image of ${breed}`} />
          <p className="py-4">{name} </p>
          <p className="py-4">Breed: {breed} </p>
          <p className="py-4">Age: {age} </p>
          <p className="py-4">Zip: {zip_code} </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div >
  )
}
export default Match;