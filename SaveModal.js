import React, { useState } from 'react';
import axios from 'axios';

const SavedContent = () => {
  const [tagname, setTagname] = useState('');
  const [title, setTitle]= useState('');
  //  const handleAddTag = async () => {
  //    try {
  //    const data = {
  //        tagname: tagname
  //      };

  //      const response = await axios.post('http://localhost:8000/addtag/', data);
  //      console.log('Tag Added:', response.data);
       
  //    } catch (error) {
  //   console.error('Error:', error.response.data);
  //     // Handle error response
  //    }
  //  };

   const handleSave = async () => {
     try {
       const tagData = {
         tagname: tagname,
       };

       const titleData = {
         title: title,
       };

       const [tagResponse, titleResponse] = await Promise.all([
         axios.post('http://localhost:8000/addtag/', tagData),
         axios.post('http://localhost:8000/addtitle/', titleData),
       ]);

       console.log('Tag Added:', tagResponse.tagData);
       console.log('Title Added:', titleResponse.titleData);
      
     } catch (error) {
       console.error('Error:', error.response);
      
     }
   };

  return (
    <div className="savedcontent flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Saving Content Model</h1>
        <p className="text-lg mb-4">Content Type</p>  
        <label className='text-2xl'>Add any Tag:</label> 
        <input
          type="text"
          value={tagname}
          onChange={(e) => setTagname(e.target.value)}
          placeholder="Enter Tagname"
          className="border border-gray-300 rounded-md p-2 mb-4"
        />

          <label className='text-2xl'>Title:</label> 
         <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
          className="border border-gray-300 rounded-md p-2 mb-4"
        />  
        <div className="flex justify-between items-center">
          <div className="buttons flex flex-row">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
              onClick={handleSave}
            >
              Saved Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedContent;
