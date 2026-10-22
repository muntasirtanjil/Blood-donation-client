import React from 'react';
import Navber from '../Components/Header/Navber';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';

const Root = () => {
    return (
        <div>
            <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl">
                <Navber ></Navber>
            </header>
            <Outlet>

            </Outlet>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Root;