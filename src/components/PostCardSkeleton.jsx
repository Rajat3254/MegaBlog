import React from 'react';

function PostCardSkeleton() {
  return (
    <div className='w-full bg-white rounded-xl p-4 shadow-md border animate-pulse' style={{ borderColor: '#e0e0e0' }}>
      <div className='w-full flex justify-center mb-4'>
        <div className='rounded-xl bg-gray-300 h-48 w-full'></div>
      </div>
      <div className='h-6 bg-gray-300 rounded w-3/4 mb-4'></div>
      <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
    </div>
  );
}

export default PostCardSkeleton; 