import { data } from 'autoprefixer';
import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

import {RegisterRequest} from '../api/auth'
import { useEffect } from 'react';

function LoginPage() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signin, isAuthenticated, errors: signinErrors} = useAuth();
    const navigate = useNavigate()

    const onSubmit = handleSubmit((data) => {
        signin(data)
    });

    useEffect(() => {
        if(isAuthenticated) navigate("/dashboard")
    },[isAuthenticated])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
        <div className='bg-lime-300 bg-opacity-60 max-w-md w-full p-10 rounded-md'>
        {
            signinErrors.map((error, i) => (
                <div className='bg-red-500 p-2 text-white mb-2 rounded-md' key={i}>
                    {error}
                </div>
            ))
        }
        <h1 className='text-4xl font-bold mb-10 text-center'>Login</h1>

        <form onSubmit={onSubmit}>
            <input type="email" {...register('email', {required: true})}
            className='w-full px-4 py-2 rounded-md mb-2'
            placeholder='E-mail'/>
            {
                errors.email && (<p className='text-red-500'>Email is required</p>
            )}
            <input type="password" {...register('password', {required: true})}
            className='w-full px-4 py-2 rounded-md mb-2'
            placeholder='Password'/>
            {
                errors.password && (<p className='text-red-500'>Password is required</p>
            )}
            <button type="submit" className='bg-lime-700 rounded-md text-white p-2'>Login</button>
        </form>
        </div>
    </div>
  )
}

export default LoginPage