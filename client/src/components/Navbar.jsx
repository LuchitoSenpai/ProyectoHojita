import React, { useState } from 'react';
import loguito from '../assets/loguito.svg';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Popup from './Popup'; // Importa el componente del popup

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <nav className='bg-lime-100 bg-opacity-100 rounded-b-2xl flex justify-between items-center'>
      <div className='p-5'>
        <img src={loguito} alt="Logo" className='logo' />
      </div>

      <ul className='flex gap-x-4 p-7 items-center'>
        {isAuthenticated ? (
          <>
            <li className='px-2 font-bold'>
              Welcome {user.username}
            </li>
            <li>
              <button className='bg-lime-600 rounded-md text-white p-2' onClick={handleOpenPopup}>
                Generate report
              </button>
            </li>
            <li>
              <Link to="/" onClick={logout} className='bg-red-600 rounded-md text-white p-2'>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className='bg-lime-700 rounded-md text-white p-2'>
                Login
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Mostrar el popup si showPopup es true */}
      <Popup show={showPopup} onClose={handleClosePopup} />
    </nav>
  );
}

export default Navbar;