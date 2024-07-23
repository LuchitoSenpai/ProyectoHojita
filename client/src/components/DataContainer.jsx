import React from 'react'

function DataContainer({text, children}) {
  return (
    <div className="bg-lime-300 bg-opacity-80 rounded-md m-5 flex-1">
        <h1 className='text-4xl font-bold text-center'>{text}</h1>
        <div className='mt-4'>
        {children}
        </div>
    </div>
  )
}

export default DataContainer