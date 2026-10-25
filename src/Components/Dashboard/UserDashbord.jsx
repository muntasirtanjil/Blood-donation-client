
import { NavLink, Outlet, Link, useNavigate } from "react-router";
import {
    FaUser,
    FaGear,
    FaHouse,
    FaDroplet,
    FaRightFromBracket,
} from "react-icons/fa6";
import { use } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const UserDashbord = () => {
    const { LogOut } = use(AuthContext);
    const navigate = useNavigate();


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
                    navigate("/", { replace: true });
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode, errorMessage)
                });
            }



        });

    }



    const menuItems = [
        {
            name: "My Donor Profile",
            path: "/dashboard/my-profile",
            icon: <FaUser />,
        },
        {
            name: "Account Settings",
            path: "/dashboard/account-settings",
            icon: <FaGear />,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 md:flex">
            {/* Sidebar */}
            <aside className="w-full shrink-0 border-b border-gray-200 bg-white md:min-h-screen md:w-64 md:border-b-0 md:border-r">
                {/* Logo */}
                <div className="flex items-center justify-between border-b border-gray-200 p-5">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-xl font-bold text-red-600"
                    >
                        <FaDroplet />
                        <span>LifeDrop</span>
                    </Link>

                    <span className="text-sm text-gray-500 md:hidden">
                        User Dashboard
                    </span>
                </div>

                {/* Sidebar Menu */}
                <div className="p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Dashboard Menu
                    </p>

                    <nav className="flex flex-col gap-2">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${isActive
                                        ? "bg-red-50 text-red-600"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`
                                }
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Back to Home */}
                    <Link
                        to="/"
                        className="mt-5 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                    >
                        <FaHouse />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="min-w-0 flex-1">
                {/* Header */}
                <header className="flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-4 sm:px-5 md:px-8">
                    <div className="min-w-0">
                        <h1 className="text-lg font-bold text-gray-800 md:text-xl">
                            User Dashboard
                        </h1>

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            Manage your donor account
                        </p>
                    </div>

                    {/* Avatar + Logout */}
                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                        {/* Avatar */}
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600 sm:h-10 sm:w-10">
                            <FaUser />
                        </div>

                        {/* Logout Button */}
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 sm:px-4"
                        >
                            <FaRightFromBracket />
                            <span>Logout</span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <section className="p-4 md:p-8">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default UserDashbord;
