import React from 'react'
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';

export default function Post({ filename, title, tags, postID, timestamp, posterID, posterUsername }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${postID}`);
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  }

  return (
    <div className='rounded-lg m-2 px-[1.5rem] py-[0.5rem] bg-[#E2E2E2] border-[3px] border-black text-left w-64 max-w-md h-auto'>
      <div onClick={handleClick} className='cursor-pointer text-xl font-sans font-bold overflow-hidden h-12 leading-6'>
        {title}
      </div>
      <div className='text-sm overflow-hidden whitespace-nowrap text-ellipsis'>
        posted by {posterUsername}
      </div>
      <div className='text-sm'>
        {formatDate(timestamp)}
      </div>
      {/* <div className='text-xs overflow-hidden whitespace-nowrap text-ellipsis'>
        {tags}
      </div> */}
    </div>
  )
}