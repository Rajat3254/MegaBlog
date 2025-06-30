import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [hover, setHover] = useState(false)
    const logoutHandler = () => {
        setLoading(true)
        authService.logout().then(() => {
            setSuccess(true)
            setTimeout(() => {
                dispatch(logout())
                setSuccess(false)
                setLoading(false)
            }, 900)
        })
    }
    let background = '#67ae6e';
    if (success) background = '#22c55e';
    else if (hover && !loading && !success) background = '#f59e42';

    return (
    <button
    className='inline-block px-6 py-2 duration-200 rounded-full font-semibold'
    style={{
      background,
      color: '#fff',
      border: '2px solid #328e6e',
      marginLeft: '0.5rem',
      minWidth: '110px',
      transition: 'background 0.3s',
      opacity: loading ? 0.7 : 1,
      cursor: loading || success ? 'not-allowed' : 'pointer',
    }}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    onClick={logoutHandler}
    disabled={loading || success}
    >
      {success ? (
        <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#22c55e"/><path d="M8 12.5l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      ) : 'Logout'}
    </button>
  )
}

export default LogoutBtn