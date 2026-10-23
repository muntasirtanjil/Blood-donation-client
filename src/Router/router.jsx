import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import ErrorPage from "../Pages/EroorPage";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import FindDonors from "../Pages/FindDonors";
import Register from "../Register/Register";
import AuthLayout from '../provider/AuthLayout'
import Login from "../Register/Login";

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
        path: "*",
        Component: ErrorPage,
    }
])