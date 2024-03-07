import React, { useState, useEffect } from 'react'
import axios, { AxiosError } from "axios";

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
  }, []);

  return (
    <div className='border border-black px-2 py-2 my-2 text-left w-fit'>
      <p>{poster}</p>
      <p>{comment.comment}</p>
    </div>
  )
}