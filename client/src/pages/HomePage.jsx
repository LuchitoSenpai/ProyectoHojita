import React from 'react';
import RotatingSVG from '../components/RotatingSVG'

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)]">
            <RotatingSVG />
            <h1 className='text-8xl font-bold pt-16 text-lime-100'>Welcome</h1>
        </div>
    );
}

export default HomePage;