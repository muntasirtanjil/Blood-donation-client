
import { use, useState } from "react";
import { BiHeart, BiMenu, BiX } from "react-icons/bi";
import { LuUserRound } from "react-icons/lu";
import { Link, NavLink } from "react-router";
import bloodLogo from "../../assets/Blood Donation Logo.png"
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, LogOut, } = use(AuthContext);

    const handleLogout = () => {

        // Sign-out successful.
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, LogOut!"
        }).then((result) => {
            if (result.isConfirmed) {
                LogOut().then(() => {

                    Swal.fire({
                        title: "Logout!",
                        text: "Logout successful.",
                        icon: "success"
                    });
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode, errorMessage)
                });
            }



        });

    }


    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Find Donors", path: "/donors" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : []),
    ];

    const linkClass = ({ isActive }) =>
        `block rounded-lg px-3 py-2 font-medium transition ${isActive
            ? "bg-red-50 text-red-600"
            : "text-gray-700 hover:bg-red-50 hover:text-red-600"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-red-100  bg-transparent shadow-sm backdrop-blur">
            <nav className="navbar mx-auto max-w-7xl px-4 py-3 lg:px-6">
                {/* Logo */}
                <Link to="/" className="flex items-center ">
                    <div>
                        <img className="rounded-full h-12 w-12" src={bloodLogo} alt="" />
                    </div>

                    <div>
                        <h1 className="text-lg font-extrabold text-gray-900 sm:text-xl">
                            Life<span className="text-red-600">Drop</span>
                        </h1>
                        <p className="text-xs text-gray-500">
                            Save Lives. Give Blood.
                        </p>

                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === "/"}
                            className={linkClass}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Desktop Buttons */}
                <div className="hidden items-center rounded-xl  gap-2 md:flex">
                    {
                        user ? <button className="btn btn-outline  border-red-600 text-red-600" onClick={handleLogout}>LogOut</button> : <Link
                            to="/auth/login"
                            onClick={() => setIsOpen(false)}
                            className="btn btn-outline  border-red-600 text-red-600"
                        >
                            Login
                        </Link>
                    }


                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="btn btn-square btn-ghost ml-auto lg:hidden"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <BiX size={25} /> : <BiMenu size={25} />}
                </button>
            </nav>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="border-t border-red-100 bg-white p-4 lg:hidden">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === "/"}
                                onClick={() => setIsOpen(false)}
                                className={linkClass}
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        <div className="mt-2 ">
                            {/* <Link
                                to="/auth/login"
                                onClick={() => setIsOpen(false)}
                                className="btn btn-outline  border-red-600 text-red-600"
                            >
                                Login
                            </Link> */}

                            {
                                user ? <button onClick={handleLogout}>LogOut</button> : <Link
                                    to="/auth/login"
                                    onClick={() => setIsOpen(false)}
                                    className="btn btn-outline  border-red-600 text-red-600"
                                >
                                    Login
                                </Link>
                            }


                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
