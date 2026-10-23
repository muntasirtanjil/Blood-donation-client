import React from 'react';
import Navber from '../Components/Header/Navber'
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className=' bg-base-200 min-h-screen'>
            <header className='w-11/12 mx-auto py-5'>
                <Navber ></Navber>
            </header>
            <main className='w-11/12 mx-auto '>
                <Outlet></Outlet>
            </main>

        </div>
    );
};

export default AuthLayout;