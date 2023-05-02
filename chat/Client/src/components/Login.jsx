import { React, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Signup from './Signup'
import { SERVER_URL } from '../varHelper';

const Login = () => {
    const [ signup, setSignup ] = useState(false)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const dispatch = useDispatch()

    console.log("Client opened");

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        
        axios.post(`${SERVER_URL}/api/login`, {
            username,
            password
        })
        .then(res => {
            if (res.data.status === false) {
                toast.error("User does not exist")
                setUsername('')
                setPassword('')
                setLoading(false)
            }
            else if (res.data.status === true) {
                dispatch(login(res.data))
                setUsername('')
                setPassword('')
                setLoading(false)
            }
        })
        .catch(err => {
            console.log(err.message);
        })
        
    }

    const handleLogSignSwitch = () => {
        setUsername('')
        setPassword('')
        setSignup(state => !state)
    }

  return (
    <>
        {
            signup ? <Signup handleLogSignSwitch={handleLogSignSwitch} />
            :
            <div className={'flex flex-col m-auto bg-white overflow-hidden w-80 h-80'}>
                <h2 className='ml-auto mr-auto py-4 font-bold text-3xl'>Login</h2>
                <hr className='mb-4' />
                <form className='flex px-10 py-2 flex-col' onSubmit={handleLoginSubmit}>
                    <input className='border-b-2 mb-6 outline-none' type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"></input>
                    <input className='border-b-2 mb-6 outline-none' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
                    <button 
                        className='bg-gradient-to-r from-blue-400 to-blue-500 text-white py-2 rounded-full cursor-pointer' 
                        type="submit"
                    >
                        {
                            loading 
                            ?   
                                <svg aria-hidden="true" className="w-6 h-6 mr-auto ml-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            : 
                                "Login"
                        }
                    </button>
                </form>
                <p className='mr-auto ml-auto text-stone-500 text-sm font-semibold'>Do not have an account? <button onClick={handleLogSignSwitch} className='text-blue-600 active:text-blue-400'>Signup</button></p>
            </div>
        }
        <ToastContainer 
            position='bottom-right'
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            theme="light"
        />
    </>
  )
}

export default Login