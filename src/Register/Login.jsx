
import { use, useState } from "react";
import { Form, Link, useNavigate } from "react-router";
import { reload } from "firebase/auth";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
    const { LoginUser, setUser } = use(AuthContext);
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputClass =
        "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100";

    const labelClass =
        "mb-2 block text-sm font-semibold text-gray-800";

    const handleLogin = async (e) => {
        e.preventDefault();

        setErrorMessage("");
        setLoading(true);

        const form = e.currentTarget;
        const email = form.email.value.trim();
        const password = form.password.value;

        try {
            const result = await LoginUser(email, password);
            const user = result.user;

            // Refresh the latest email verification status
            await reload(user);

            if (!user.emailVerified) {
                setErrorMessage(
                    "তোমার Email এখনো verify করা হয়নি। Gmail-এর verification link-এ click করো।"
                );
                return;
            }

            // Update global user state if available
            if (typeof setUser === "function") {
                setUser(user);
            }

            form.reset();
            setShowPassword(false);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error.code, error.message);

            switch (error.code) {
                case "auth/invalid-credential":
                case "auth/wrong-password":
                case "auth/user-not-found":
                    setErrorMessage(
                        "Email অথবা Password ভুল হয়েছে। আবার চেষ্টা করো।"
                    );
                    break;

                case "auth/invalid-email":
                    setErrorMessage(
                        "সঠিক Email Address লিখো।"
                    );
                    break;

                case "auth/user-disabled":
                    setErrorMessage(
                        "এই account বন্ধ করা হয়েছে। Admin-এর সঙ্গে যোগাযোগ করো।"
                    );
                    break;

                case "auth/too-many-requests":
                    setErrorMessage(
                        "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করো।"
                    );
                    break;

                case "auth/network-request-failed":
                    setErrorMessage(
                        "Internet connection পরীক্ষা করে আবার চেষ্টা করো।"
                    );
                    break;

                default:
                    setErrorMessage(
                        "Login করা যায়নি। আবার চেষ্টা করো।"
                    );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-3 py-8 sm:px-5 sm:py-12">
            <div className="mx-auto flex w-full max-w-md items-center">
                <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-md sm:p-8">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="mb-8 flex w-fit items-center gap-2"
                    >
                        <span className="text-4xl text-red-600">
                            ♥
                        </span>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Life<span className="text-red-600">Drop</span>
                        </h1>
                    </Link>

                    {/* Heading */}
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Welcome Back!
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                        Login to your LifeDrop donor account.
                    </p>

                    {/* Login Form */}
                    <Form
                        onSubmit={handleLogin}
                        className="mt-7 space-y-5"
                    >
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className={labelClass}
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
                                className={inputClass}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className={labelClass}
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className={`${inputClass} pr-20`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((previous) => !previous)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-1 py-1 text-sm font-semibold text-gray-700 transition hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot Password */}
                        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                            <label className="flex cursor-pointer items-center gap-2 font-medium text-gray-700">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    className="checkbox checkbox-sm checkbox-error"
                                />
                                Remember me
                            </label>

                            <Link
                                to="/forgot-password"
                                className="font-semibold text-red-700 hover:text-red-800 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <div
                                role="alert"
                                aria-live="polite"
                                className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-800"
                            >
                                {errorMessage}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Checking..." : "Login"}
                        </button>
                    </Form>

                    {/* Sign Up */}
                    <p className="mt-6 text-center text-sm leading-6 text-gray-700">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/auth/register"
                            className="font-bold text-red-700 hover:text-red-800 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>

                    <p className="mt-6 text-center text-xs leading-5 text-gray-500">
                        Donate Blood. Save Lives. ❤️
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Login;
