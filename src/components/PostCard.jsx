import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
function PostCard({$id,title,featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border flex flex-col items-center text-center sm:text-left' style={{borderColor: '#328e6e'}}>
            <div className='w-full flex justify-center mb-4'>
                <img src={appwriteService.getFileUrl(featuredImage)} alt={title} 
                className='rounded-xl max-h-48 object-cover border w-full max-w-xs sm:max-w-full' style={{borderColor: '#90c67c'}}/>
            </div>
            <h2 className='text-xl font-bold mb-2'>{title}</h2>
            <span className="inline-block px-3 py-1 text-sm rounded-full mt-2" style={{background: '#67ae6e', color: '#fff'}}>Read More</span>
        </div>
    </Link>
  )
}

export default PostCard