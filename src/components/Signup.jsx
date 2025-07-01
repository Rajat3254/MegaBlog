import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        setLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="flex items-center justify-center" style={{background: '#e1eebc', minHeight: '100vh'}}>
            <div className={`mx-auto w-full max-w-sm sm:max-w-lg rounded-xl p-10 border px-4 sm:px-10`} style={{background: '#fff', borderColor: '#328e6e'}}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight" style={{color: '#328e6e'}}>Sign up to create account</h2>
                <p className="mt-2 text-center text-base" style={{color: '#328e6e'}}>
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium transition-all duration-200 hover:underline"
                        style={{color: '#67ae6e'}}
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full" style={{background: '#328e6e', color: '#fff', border: 'none'}}
                        onMouseOver={e => {e.target.style.background='#67ae6e';}}
                        onMouseOut={e => {e.target.style.background='#328e6e';}}
                        disabled={loading}
                        >
                          {loading ? (
                            <span>
                              <svg className="inline mr-2 w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4"></circle><path className="opacity-75" fill="#67ae6e" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
                              Creating account...
                            </span>
                          ) : 'Create Account'}
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup