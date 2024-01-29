import React, { useState,useEffect } from 'react';
import { Document, Packer, Paragraph } from 'docx';
import { useLocation } from 'react-router-dom';

const SavedContent = () => {
  const [paragraph, setParagraph] = useState('Your paragraph of words goes here.');

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([paragraph], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'paragraph.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
const location=useLocation();
const outputData= location.state?.output;
useEffect(() => {
  if (outputData) {
    setParagraph(outputData);
  }
}, [outputData]);
  return (
    <div className="savedcontent flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Title of Content</h1>
        <p className="text-lg mb-4">Content Type</p>  
        <div className="my-8">
          <p>{paragraph}</p>
        </div>
        <div className="flex justify-between items-center">
        <div className='buttons flex flex-row'>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4" onClick={handleDownload}>Download</button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">Share</button>
        </div>
          
        </div>
      </div>
    </div>
    
  );
};

export default SavedContent;
