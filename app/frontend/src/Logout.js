import React from 'react'


export default function Logout() {
  return (
    <div className="logout-background text-xl flex justify-center items-center h-screen " >
      <div className="card font-sans p-12 border-[3px] border-black rounded-lg bg-[#E2E2E2]">
        <h2 className='text-center font-bold text-4xl'>Sign Out</h2>
        <br></br>
        <p className='font-medium'>You are signing out of AI Generator</p>
        <p className='font-medium'>Do you want to logout?</p>
        <br></br>
        <div className='buttons'>
          <button className='bg-[#19747E] text-white py-2 rounded hover:bg-[#316268] w-[100%]'>Log Out</button>
          <button className='bg-white text-black py-2 mt-4 rounded hover:bg-[#e2e2e2] w-[100%]'>Go back</button>
        </div>

      </div>
    </div>
  )
}
