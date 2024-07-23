import { data } from 'autoprefixer';
import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

import {RegisterRequest} from '../api/auth'
import { useEffect } from 'react';

function RegisterPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if(isAuthenticated) navigate("/dashboard")
    },[isAuthenticated])

    const onSubmit = handleSubmit(async(data) => {
        signup(data)
    });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
        <div className='bg-lime-300 bg-opacity-60 max-w-md w-full p-10 rounded-md'>
        {
            registerErrors.map((error, i) => (
                <div className='bg-red-500 p-2 text-white mb-2 rounded-md' key={i}>
                    {error}
                </div>
            ))
        }
        <h1 className='text-2xl font-bold mb-2'>Register</h1>

        <form onSubmit={onSubmit}>
            <input type="text" {...register('username', {required: true})}
            className='w-full px-4 py-2 rounded-md mb-2'
            placeholder='Username'/>
            {
                errors.username && (<p className='text-red-500'>Username is required</p>
            )}
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
            <button type="submit">Register</button>
        </form>
        </div>
    </div>
  )
}

export default RegisterPage