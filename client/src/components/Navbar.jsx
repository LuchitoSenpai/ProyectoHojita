import loguito from '../assets/loguito.svg'
import {useAuth} from '../context/AuthContext'
import {Link} from 'react-router-dom'

function Navbar() {
    const {isAuthenticated, logout, user} = useAuth();
    
  return (
    <nav className='bg-lime-100 bg-opacity-100 rounded-b-2xl flex justify-between'>
       <div className='p-5'>
        <img src={loguito} alt="Logo" className='logo'/>
       </div>

       <ul className='flex gap-x-2 p-7'>
        {isAuthenticated ? (
            <>
                <li className='px-2 font-bold'>
                    Welcome {user.username}
                </li>
                <li>
                    <Link to="/" onClick={() => {
                        logout();
                    }} className='bg-red-600 rounded-md text-white p-2'>Logout</Link>
                </li>
            </>

        ) : (
            <>
                <li className=''>
                    <Link to="/login" className='bg-lime-700 rounded-md text-white p-2'>Login</Link>
                </li>
            </>
        )}
       </ul>
    </nav>
  )
}

export default Navbar