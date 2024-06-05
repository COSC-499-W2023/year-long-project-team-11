import React, { useState, useEffect } from 'react'

export default function Comment({ comment }) {
  const [poster, setPoster] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/${comment.userid}/`, {
      headers: {
        'Authorization': 'Bearer '.concat(localStorage.getItem('access_token')),
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); 
        setPoster(data.username);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, [comment.userid]);

  return (
    <div className='border border-black px-2 py-2 my-2 text-left w-full rounded-lg'>
      <p>{comment.comment}</p>
      <p className='text-xs'>Submitted by {poster}</p>
    </div>
  )
}