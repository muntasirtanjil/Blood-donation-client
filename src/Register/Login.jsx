
import React, { use } from "react";
import { Form, Link } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
    const { LoginUser } = use(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        LoginUser(email, password)
            .then((result) => {
                console.log("Login successful:", result.user);
                form.reset();
            })
            .catch((error) => {
                console.error("Login failed:", error.message);
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
                <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                    {/* Logo */}
                    <Link to="/" className="mb-8 flex items-center gap-2">
                        <span className="text-4xl text-red-500">♥</span>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Life<span className="text-red-500">Drop</span>
                        </h1>
                    </Link>

                    {/* Heading */}
                    <h2 className="text-2xl font-bold text-gray-900">
                        Welcome Back!
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Login to your LifeDrop donor account.
                    </p>

                    {/* Login Form */}
                    <Form
                        onSubmit={handleLogin}
                        className="mt-7 space-y-5"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                autoComplete="email"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            />
                        </div>

                        <div className="flex items-center justify-between gap-3 text-sm">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    className="accent-red-500"
                                />
                                Remember me
                            </label>

                            <Link
                                to="/forgot-password"
                                className="font-medium text-red-500 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
                        >
                            Login
                        </button>
                    </Form>

                    {/* Sign Up */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/auth/register"
                            className="font-semibold text-red-500 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>

                    <p className="mt-6 text-center text-xs text-gray-400">
                        Donate Blood. Save Lives. ❤️
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
