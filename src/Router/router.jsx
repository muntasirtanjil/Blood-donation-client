import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import ErrorPage from "../Pages/EroorPage";
import Home from "../Pages/Home";

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

            }
        ]
    },
    {
        path: "*",
        Component: ErrorPage,
    }
])