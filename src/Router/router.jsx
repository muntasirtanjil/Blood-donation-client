import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import ErrorPage from "../Pages/EroorPage";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import FindDonors from "../Pages/FindDonors";
import Register from "../Register/Register";
import AuthLayout from '../provider/AuthLayout'
import Login from "../Register/Login";
import PrivateRoute from "../provider/PrivateRoute";
import UserDashbord from "../Components/Dashboard/UserDashbord";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home

            },
            {
                path: '/donors',
                Component: FindDonors

            },
            {
                path: '/about',
                Component: AboutUs,


            },
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: Login,
            }

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <UserDashbord></UserDashbord>
        </PrivateRoute>

    },
    {
        path: "*",
        Component: ErrorPage,
    }
])