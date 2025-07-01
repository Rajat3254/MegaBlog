import React, { useState } from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "My Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='py-3 shadow' style={{background: '#328e6e'}}>
      <Container>
        <nav className='flex flex-col items-center gap-2 sm:flex-row sm:gap-0'>
          <div className='mb-2 sm:mb-0 sm:mr-4 flex justify-between items-center w-full sm:w-auto'>
            <Link to='/'>
              <Logo width='60px'   />
            </Link>
            {/* Hamburger for small screens */}
            <button className='sm:hidden p-2' aria-label='Toggle menu' onClick={() => setMenuOpen(!menuOpen)}>
              <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
                <rect y='4' width='24' height='2' rx='1' fill='#fff'/>
                <rect y='11' width='24' height='2' rx='1' fill='#fff'/>
                <rect y='18' width='24' height='2' rx='1' fill='#fff'/>
              </svg>
            </button>
          </div>
          {/* Dropdown nav for small screens, horizontal for sm+ */}
          <ul className={`flex-col items-center w-full gap-2 mr-4 sm:ml-auto sm:flex sm:flex-row sm:w-auto sm:gap-0 ${menuOpen ? 'flex' : 'hidden'} sm:flex`}>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name} className='w-full sm:w-auto'>
                <button
                onClick={() => {navigate(item.slug); setMenuOpen(false)}}
                className='inline-block w-full sm:w-auto px-6 py-2 duration-200 rounded-full font-semibold'
                style={{background: 'transparent', color: '#fff', border: '2px solid #90c67c', marginLeft: '0.5rem'}}
                onMouseOver={e => {e.target.style.background='#90c67c'; e.target.style.color='#328e6e';}}
                onMouseOut={e => {e.target.style.background='transparent'; e.target.style.color='#fff';}}
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li className='w-full sm:w-auto flex justify-center'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header