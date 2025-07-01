import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'

// Utility to decode HTML entities
function decodeHtmlEntities(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)
    const [showAllRecent, setShowAllRecent] = useState(false)

    useEffect(() => {
        if (authStatus) {
            // Use Appwrite Query helper to fetch only active posts
            appwriteService.getPosts([Query.equal('status', 'active')]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [authStatus])

    // If not logged in, show community tab immediately
    if (!authStatus) {
        return (
            <div className="w-full flex justify-center items-center min-h-[60vh]" style={{background: 'linear-gradient(135deg, #e1eebc 60%, #90c67c 100%)'}}>
                <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border p-10 flex flex-col items-center" style={{borderColor: '#67ae6e'}}>
                    <div className="mb-6">
                        {/* Lock/Community SVG */}
                        <svg width="72" height="72" fill="none" viewBox="0 0 48 48">
                          <rect width="48" height="48" rx="24" fill="#e1eebc"/>
                          <path d="M24 28a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm7-4v-3a7 7 0 1 0-14 0v3a5 5 0 0 0-3 4.58V34a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-5.42A5 5 0 0 0 31 24Zm-10-3a5 5 0 1 1 10 0v3h-10v-3Zm13 13a1 1 0 0 1-1 1H17a1 1 0 0 1-1-1v-5.42A3 3 0 0 1 19 26h10a3 3 0 0 1 3 2.58V34Z" fill="#328e6e"/>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-extrabold mb-2 text-center" style={{color: '#328e6e'}}>Unlock the Community!</h1>
                    <p className="mb-8 text-gray-700 text-center">Sign in to join the conversation and explore amazing posts from our members.</p>
                    <Link to="/login">
                        <button style={{background: '#328e6e', color: '#fff', border: 'none', padding: '0.75rem 2.5rem', borderRadius: '999px', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 8px 0 rgba(50,142,110,0.12)', transition: 'background 0.2s'}}
                        onMouseOver={e => {e.target.style.background='#67ae6e';}}
                        onMouseOut={e => {e.target.style.background='#328e6e';}}
                        >
                          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#67ae6e"/><path d="M12 17a2 2 0 0 0 2-2v-1a2 2 0 1 0-4 0v1a2 2 0 0 0 2 2Zm6-5v-2a6 6 0 1 0-12 0v2a4 4 0 0 0-2 3.46V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3.54A4 4 0 0 0 18 12Zm-10-2a4 4 0 1 1 8 0v2H8v-2Zm12 9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3.54A2 2 0 0 1 6 14h12a2 2 0 0 1 2 1.46V19Z" fill="#fff"/></svg>
                          Sign In
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center min-h-[60vh]" style={{background: 'linear-gradient(135deg, #e1eebc 60%, #90c67c 100%)'}}>
                <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border p-10 flex flex-col items-center" style={{borderColor: '#67ae6e'}}>
                    <div className="mb-6 flex space-x-2">
                        <span className="inline-block w-4 h-4 rounded-full" style={{background: '#328e6e', animation: 'bounce 1s infinite'}}></span>
                        <span className="inline-block w-4 h-4 rounded-full" style={{background: '#67ae6e', animation: 'bounce 1s 0.2s infinite'}}></span>
                        <span className="inline-block w-4 h-4 rounded-full" style={{background: '#90c67c', animation: 'bounce 1s 0.4s infinite'}}></span>
                    </div>
                    <h1 className="text-xl font-bold mb-2 text-center" style={{color: '#328e6e'}}>Fetching the latest stories…</h1>
                    <p className="text-gray-700 text-center">Hang tight while we load new posts for you!</p>
                </div>
                <style>{`
                @keyframes bounce {
                  0%, 80%, 100% { transform: translateY(0); }
                  40% { transform: translateY(-16px); }
                }
                `}</style>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full flex justify-center items-center min-h-[60vh]" style={{background: 'linear-gradient(135deg, #e1eebc 60%, #90c67c 100%)'}}>
                <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border p-10 flex flex-col items-center" style={{borderColor: '#67ae6e'}}>
                    <div className="mb-6">
                        <svg width="72" height="72" fill="none" viewBox="0 0 48 48">
                          <rect width="48" height="48" rx="24" fill="#e1eebc"/>
                          <path d="M24 28a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm7-4v-3a7 7 0 1 0-14 0v3a5 5 0 0 0-3 4.58V34a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-5.42A5 5 0 0 0 31 24Zm-10-3a5 5 0 1 1 10 0v3h-10v-3Zm13 13a1 1 0 0 1-1 1H17a1 1 0 0 1-1-1v-5.42A3 3 0 0 1 19 26h10a3 3 0 0 1 3 2.58V34Z" fill="#328e6e"/>
                        </svg>
                    </div>
                    {authStatus ? (
                      <>
                        <h1 className="text-2xl font-extrabold mb-2 text-center" style={{color: '#328e6e'}}>No posts yet!</h1>
                        <p className="mb-8 text-gray-700 text-center">Be the first to create a post and start the conversation.</p>
                        <Link to="/add-post">
                            <button style={{background: '#328e6e', color: '#fff', border: 'none', padding: '0.75rem 2.5rem', borderRadius: '999px', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 8px 0 rgba(50,142,110,0.12)', transition: 'background 0.2s'}}
                            onMouseOver={e => {e.target.style.background='#67ae6e';}}
                            onMouseOut={e => {e.target.style.background='#328e6e';}}
                            >
                              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#67ae6e"/><path d="M12 17a2 2 0 0 0 2-2v-1a2 2 0 1 0-4 0v1a2 2 0 0 0 2 2Zm6-5v-2a6 6 0 1 0-12 0v2a4 4 0 0 0-2 3.46V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3.54A4 4 0 0 0 18 12Zm-10-2a4 4 0 1 1 8 0v2H8v-2Zm12 9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3.54A2 2 0 0 1 6 14h12a2 2 0 0 1 2 1.46V19Z" fill="#fff"/></svg>
                              Create Post
                            </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <h1 className="text-2xl font-extrabold mb-2 text-center" style={{color: '#328e6e'}}>Unlock the Community!</h1>
                        <p className="mb-8 text-gray-700 text-center">Sign in to join the conversation and explore amazing posts from our members.</p>
                        <Link to="/login">
                            <button style={{background: '#328e6e', color: '#fff', border: 'none', padding: '0.75rem 2.5rem', borderRadius: '999px', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 8px 0 rgba(50,142,110,0.12)', transition: 'background 0.2s'}}
                            onMouseOver={e => {e.target.style.background='#67ae6e';}}
                            onMouseOut={e => {e.target.style.background='#328e6e';}}
                            >
                              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#67ae6e"/><path d="M12 17a2 2 0 0 0 2-2v-1a2 2 0 1 0-4 0v1a2 2 0 0 0 2 2Zm6-5v-2a6 6 0 1 0-12 0v2a4 4 0 0 0-2 3.46V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3.54A4 4 0 0 0 18 12Zm-10-2a4 4 0 1 1 8 0v2H8v-2Zm12 9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3.54A2 2 0 0 1 6 14h12a2 2 0 0 1 2 1.46V19Z" fill="#fff"/></svg>
                              Sign In
                            </button>
                        </Link>
                      </>
                    )}
                </div>
            </div>
        )
    }

    // --- Personalized Home Layout ---
    // Sort posts by creation date descending
    const sortedPosts = [...posts].sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
    const heroPost = sortedPosts[0]
    const recentPosts = sortedPosts.slice(1, 7)

    return (
        <div className='w-full min-h-screen' style={{background: '#e1eebc', padding: '2rem 0'}}>
            <Container>
                {userData?.name && (
                  <h2 className="text-2xl font-bold mb-6 text-teal-700">Welcome back, {userData.name.split(' ')[0]}!</h2>
                )}
                {/* Split Hero Layout */}
                {heroPost && (
                  <div className="mb-10">
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto">
                      {/* Image left, content right */}
                      <div className="flex-shrink-0 w-full md:w-80 flex items-center justify-center bg-[#e1eebc] rounded-2xl p-4 mb-6 md:mb-0" style={{ minHeight: '220px', maxHeight: '320px' }}>
                        <img src={appwriteService.getFileUrl(heroPost.featuredImage)} alt={heroPost.title} className="rounded-2xl shadow-md w-auto h-full max-h-72 max-w-full object-contain" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center w-full">
                        <h1 className="text-3xl font-extrabold text-teal-700 mb-2 text-center md:text-left">{heroPost.title}</h1>
                        <p className="text-gray-700 mb-4 text-center md:text-left line-clamp-3">{decodeHtmlEntities(heroPost.content.replace(/<[^>]+>/g, '')).slice(0, 180)}...</p>
                        <div className="flex justify-center md:justify-start">
                          <Link to={`/post/${heroPost.$id}`} className="inline-block px-6 py-2 bg-teal-600 text-white font-semibold rounded-full shadow hover:bg-teal-700 transition-all w-max">Read More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Recent Posts Grid */}
                {recentPosts.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold mb-4 text-teal-700">{showAllRecent ? 'All Posts' : 'Recent Posts'}</h3>
                    <div className='grid grid-cols-1 sm:flex sm:flex-wrap rounded-xl p-4 mb-8' style={{background: '#fff', border: '2px solid #67ae6e'}}>
                        {(showAllRecent ? recentPosts : recentPosts.slice(0, 4)).map((post) => (
                            <div key={post.$id} className='mb-4 sm:mb-0 sm:p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                <PostCard {...post} excerpt={decodeHtmlEntities(post.content.replace(/<[^>]+>/g, '')).slice(0, 120)} />
                            </div>
                        ))}
                    </div>
                    {!showAllRecent && recentPosts.length > 4 && (
                      <div className="flex justify-center mt-4">
                        <button onClick={() => setShowAllRecent(true)} style={{background: '#328e6e', color: '#fff', border: 'none', padding: '0.75rem 2.5rem', borderRadius: '999px', fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 2px 8px 0 rgba(50,142,110,0.12)', transition: 'background 0.2s'}}
                          onMouseOver={e => {e.target.style.background='#67ae6e';}}
                          onMouseOut={e => {e.target.style.background='#328e6e';}}
                        >
                          See More
                        </button>
                      </div>
                    )}
                  </>
                )}
            </Container>
        </div>
    )
}

export default Home
