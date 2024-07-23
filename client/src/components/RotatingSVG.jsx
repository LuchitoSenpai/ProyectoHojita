import React, { useState, useEffect } from 'react';
import loguito from '../assets/loguito.svg';

function RotatingSVG() {
    return (
        <img className='mt-16'
            src={loguito} 
            alt="Logo" 
            style={{ 
                width: '350px', 
                height: 'auto',
                animation: 'spin 10s linear infinite' 
            }} 
        />
    );
}

export default RotatingSVG;