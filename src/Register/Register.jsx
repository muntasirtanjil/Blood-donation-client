
import { useState } from "react";
import { Link } from "react-router";
import {
    BiDroplet,
    BiUser,
    BiEnvelope,
    BiLockAlt,
    BiPhone,
    BiMap,
    BiShow,
    BiHide,
    BiHeart,
} from "react-icons/bi";

const initialFormData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    available: true,
    agree: false,
};

const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
];

const districts = ["Cumilla", "Feni", "Dhaka", "Chattogram"];

const Register = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));

        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!formData.agree) {
            setError("Please accept the terms and conditions.");
            return;
        }

        setLoading(true);

        try {
            // Firebase Authentication will be connected here.
            console.log("Registration form is valid.");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100";

    const selectClass =
        "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100";

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:py-16">
            <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
                {/* Left panel */}
                <section className="hidden flex-col justify-between bg-red-600 p-10 text-white lg:flex xl:p-14">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                        <BiDroplet className="text-4xl" />
                        Roktiva
                    </Link>

                    <div>
                        <BiHeart className="mb-5 text-6xl" />

                        <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                            Become a donor.
                            <br />
                            Save a life.
                        </h1>

                        <p className="mt-5 max-w-md leading-7 text-red-100">
                            Join our blood donation community and help people find blood
                            donors when they need them most.
                        </p>
                    </div>

                    <p className="text-sm text-red-100">
                        Every drop counts. Every donor matters.
                    </p>
                </section>

                {/* Registration form */}
                <section className="p-5 sm:p-8 lg:p-10 xl:p-12">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-xl font-bold text-red-600 lg:hidden"
                    >
                        <BiDroplet className="text-3xl" />
                        Roktiva
                    </Link>

                    <div className="mb-8 mt-6 lg:mt-0">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Create Account
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Join Roktiva and help save lives.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <BiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className={inputClass}
                                    autoComplete="name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <BiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={inputClass}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <div className="relative">
                                <BiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    className={inputClass}
                                    autoComplete="tel"
                                    required
                                />
                            </div>
                        </div>

                        {/* Blood group and district */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Blood Group
                                </label>
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    className={selectClass}
                                    required
                                >
                                    <option value="">Select group</option>
                                    {bloodGroups.map((group) => (
                                        <option key={group} value={group}>
                                            {group}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    District
                                </label>
                                <select
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className={selectClass}
                                    required
                                >
                                    <option value="">Select district</option>
                                    {districts.map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Upazila */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Upazila
                            </label>
                            <div className="relative">
                                <BiMap className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                                <input
                                    type="text"
                                    name="upazila"
                                    value={formData.upazila}
                                    onChange={handleChange}
                                    placeholder="Enter your upazila"
                                    className={inputClass}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className={`${inputClass} pr-12`}
                                    autoComplete="new-password"
                                    minLength={6}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((previous) => !previous)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-xl text-gray-500"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <BiHide /> : <BiShow />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Enter password again"
                                    className={`${inputClass} pr-12`}
                                    autoComplete="new-password"
                                    minLength={6}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword((previous) => !previous)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-xl text-gray-500"
                                    aria-label={
                                        showConfirmPassword ? "Hide password" : "Show password"
                                    }
                                >
                                    {showConfirmPassword ? <BiHide /> : <BiShow />}
                                </button>
                            </div>
                        </div>

                        {/* Donor availability */}
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-red-50 p-4">
                            <input
                                type="checkbox"
                                name="available"
                                checked={formData.available}
                                onChange={handleChange}
                                className="mt-1 accent-red-600"
                            />
                            <span>
                                <span className="block text-sm font-semibold text-gray-800">
                                    Available to donate blood
                                </span>
                                <span className="mt-1 block text-xs leading-5 text-gray-500">
                                    You can change your availability later.
                                </span>
                            </span>
                        </label>

                        {/* Terms */}
                        <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                name="agree"
                                checked={formData.agree}
                                onChange={handleChange}
                                className="mt-1 accent-red-600"
                                required
                            />
                            <span>
                                I agree to the terms and conditions.
                            </span>
                        </label>

                        {error && (
                            <p role="alert" className="text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-red-600 py-3.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Please wait..." : "Create Account"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/auth/login"
                            className="font-semibold text-red-600 hover:text-red-700"
                        >
                            Login
                        </Link>
                    </p>
                </section>
            </div>
        </main>
    );
};

export default Register;
