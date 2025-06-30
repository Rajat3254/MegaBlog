import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"
import PostCardSkeleton from '../components/PostCardSkeleton'
import { useSelector } from 'react-redux'

function InactiveBadge() {
  return (
    <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-orange-200 text-orange-800 ml-2 align-middle">Inactive</span>
  )
}

function MyPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showInactive, setShowInactive] = useState(true)
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        appwriteService.getPosts([]).then((response) => {
            if (response) {
                setPosts(response.documents)
            }
        }).finally(() => setLoading(false))
    }, [])

    // Only show posts belonging to the current user
    const userPosts = userData ? posts.filter(post => post.userId === userData.$id) : []
    const activePosts = userPosts.filter(post => post.status === 'active')
    const inactivePosts = userPosts.filter(post => post.status !== 'active')
    const visiblePosts = showInactive ? userPosts : activePosts

    return (
        <div className='w-full min-h-screen' style={{background: '#f6fae6', padding: '2rem 0'}}>
            <Container>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                  <div>
                    <h1 className="text-3xl font-extrabold text-teal-700 mb-2">My Posts</h1>
                    <div className="text-gray-600 text-sm font-medium">
                      Total: {userPosts.length} &nbsp;|&nbsp; Active: {activePosts.length} &nbsp;|&nbsp; Inactive: {inactivePosts.length}
                    </div>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-full font-semibold shadow border transition-all ${showInactive ? 'bg-orange-100 text-orange-800 border-orange-300' : 'bg-teal-600 text-white border-teal-600 hover:bg-teal-700'}`}
                    onClick={() => setShowInactive(v => !v)}
                  >
                    {showInactive ? 'Show Only Active' : 'Show All'}
                  </button>
                </div>
                {loading ? (
                    <div className='flex flex-wrap rounded-xl p-4' style={{background: '#fff', border: '2px solid #328e6e'}}>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                <PostCardSkeleton />
                            </div>
                        ))}
                        <div className="w-full text-center mt-6 text-teal-700 font-semibold animate-pulse">Loading your posts...</div>
                    </div>
                ) : (
                    <div className='flex flex-wrap rounded-xl p-4' style={{background: '#fff', border: '2px solid #328e6e'}}>
                        {visiblePosts.length > 0 ? (
                            visiblePosts.map((post) => (
                                <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                    <div className="relative">
                                      <PostCard {...post} />
                                      {post.status !== 'active' && <InactiveBadge />}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center w-full py-16">
                                <h2 className="text-2xl font-semibold text-gray-700 mb-4">No Posts Found</h2>
                                <p className="text-gray-500 mb-6">It looks like there are no articles here. Why not be the first to post?</p>
                                <Link to="/add-post" className="inline-block px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105" style={{background: '#328e6e'}}>
                                    Create a New Post
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default MyPosts
