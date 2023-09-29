import React from 'react';

const Pagination = ({ from, searchResult, handleNextPage, handlePrevPage }) => {
  return (
    <div className='pagination'>
      <div className="flex flex-col items-center dark:text-white" >
        {/* <!-- Help text --> */}
        < span className="text-sm" >
          Showing < span className="font-semibold  dark:text-white" > {from + 1
          }</span> to < span className="font-semibold dark:text-white" > {from + 25}
          </span > of < span className="font-semibold  dark:text-white" > {searchResult.total}</span > Entries
        </span >
        <div className="inline-flex mt-2 xs:mt-0">
          {/* <!-- Buttons --> */}
          <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white" onClick={handlePrevPage}>
            <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
            </svg>
            Prev
          </button>
          <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white" onClick={handleNextPage}>
            Next
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </div>
      </div >
    </div >
  )
}

export default Pagination;