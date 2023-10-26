import React from 'react'

export default function Logout() {
  return (
    <div className="logout-background text-5xl flex justify-center items-center h-screen " >
        <div className="card font-sans p-12 border-4 border-blue-500 bg-white">
        <h2 className='text-center text-gray-600 font-bold text-8xl'>Sign Out</h2>
        <br></br>
        <p className='font-medium'>You are signing out of AI Generator</p>
        <p className='font-medium'>Do you want to logout?</p> 
        <br></br>
        <div className='buttons flex flex-col'>
        <button className='bg-gray-700 text-white font-bold py-2 px-12 rounded mx-auto'>Log Out</button>
        <br></br> 
        <button className='bg-gray-700 text-white font-bold py-2 px-12 rounded mx-auto'>Go back</button>
        </div>
        
      </div>
    </div>
  )
}