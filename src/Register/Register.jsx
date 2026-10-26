
import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BiHeart } from "react-icons/bi";
import { AuthContext } from "../provider/AuthProvider";
import { sendEmailVerification } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [loading, setLoading] = useState(false);

    const { CreateUser } = use(AuthContext);
    const navigate = useNavigate();

    const locationData = {
        Feni: [
            "Feni Sadar",
            "Chhagalnaiya",
            "Daganbhuiyan",
            "Parshuram",
            "Sonagazi",
            "Fulgazi",
        ],
        Cumilla: [
            "Adarsha Sadar",
            "Barura",
            "Brahmanpara",
            "Burichang",
            "Chandina",
            "Chauddagram",
            "Daudkandi",
            "Debidwar",
            "Homna",
            "Laksam",
            "Lalmai",
            "Meghna",
            "Monoharganj",
            "Muradnagar",
            "Nangalkot",
            "Sadar Dakshin",
            "Titas",
        ],
        Noakhali: [
            "Noakhali Sadar",
            "Begumganj",
            "Companiganj",
            "Chatkhil",
            "Hatiya",
            "Subarnachar",
            "Senbagh",
            "Kabirhat",
            "Sonaimuri",
        ],
        Chattogram: [
            "Anwara",
            "Banshkhali",
            "Boalkhali",
            "Chandanaish",
            "Fatikchhari",
            "Hathazari",
            "Karnaphuli",
            "Lohagara",
            "Mirsharai",
            "Patiya",
            "Rangunia",
            "Raozan",
            "Sandwip",
            "Satkania",
            "Sitakunda",
        ],
    };

    // Reusable classes for readable form controls
    const inputClass =
        "input w-full border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100";

    const selectClass =
        "select w-full border border-gray-300 bg-white text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:bg-gray-100 disabled:text-gray-500";

    const labelClass =
        "mb-1.5 block text-sm font-semibold text-gray-800";

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const formData = new FormData(form);

        const name = formData.get("name")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password");
        const number = formData.get("number")?.toString().trim();
        const upazila = formData.get("upazila")?.toString();
        const district = formData.get("district")?.toString();
        const bloodGroup = formData.get("bloodGroup")?.toString();

        const donorData = {
            name,
            email,
            number,
            upazila,
            district,
            bloodGroup,
        };

        try {
            // Create Firebase account
            const result = await CreateUser(email, password);
            const user = result.user;

            // Save pending donor data until email verification
            localStorage.setItem(
                "pendingDonor",
                JSON.stringify(donorData)
            );

            // Send verification email
            await sendEmailVerification(user);

            Swal.fire({
                title: "Verification email sent! Check your inbox and click the verification link",
                showClass: {
                    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    ` },
                hideClass: {
                    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    ` }
            });

            // Navigate to email verification page
            navigate("/verify-email");
        } catch (error) {
            console.error("Registration error:", error);

            if (error.code === "auth/email-already-in-use") {
                alert("এই email দিয়ে ইতিমধ্যে account তৈরি করা হয়েছে।");
            } else if (error.code === "auth/weak-password") {
                alert("Password কমপক্ষে ৬ অক্ষরের হতে হবে।");
            } else if (error.code === "auth/invalid-email") {
                alert("সঠিক email address দাও।");
            } else {
                alert(error.message || "Registration failed!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-3 py-8 sm:px-5 sm:py-12">
            <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-5 shadow-md sm:p-8">

                {/* Header */}
                <div className="mb-7 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                        <BiHeart className="text-3xl text-red-600" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Join Life<span className="text-red-600">Drop</span>
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                        Create your account and help save lives.
                    </p>
                </div>

                {/* Register Form */}
                <form onSubmit={handleRegister} className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label htmlFor="register-name" className={labelClass}>
                            Full Name
                        </label>
                        <input
                            id="register-name"
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className={inputClass}
                            autoComplete="name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="register-email" className={labelClass}>
                            Email Address
                        </label>
                        <input
                            id="register-email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className={inputClass}
                            autoComplete="email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="register-password" className={labelClass}>
                            Password
                        </label>

                        <input
                            id="register-password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Create a password"
                            className={inputClass}
                            autoComplete="new-password"
                            minLength={6}
                            required
                        />

                        <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-sm checkbox-error"
                                checked={showPassword}
                                onChange={(e) =>
                                    setShowPassword(e.target.checked)
                                }
                            />
                            Show password
                        </label>
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="register-number" className={labelClass}>
                            Phone Number
                        </label>
                        <input
                            id="register-number"
                            type="tel"
                            name="number"
                            placeholder="01XXXXXXXXX"
                            className={inputClass}
                            autoComplete="tel"
                            inputMode="tel"
                            required
                        />
                    </div>

                    {/* Blood Group & District */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* Blood Group */}
                        <div>
                            <label htmlFor="register-blood" className={labelClass}>
                                Blood Group
                            </label>

                            <select
                                id="register-blood"
                                name="bloodGroup"
                                defaultValue=""
                                className={selectClass}
                                required
                            >
                                <option value="" disabled>
                                    Select group
                                </option>

                                {[
                                    "A+",
                                    "A-",
                                    "B+",
                                    "B-",
                                    "AB+",
                                    "AB-",
                                    "O+",
                                    "O-",
                                ].map((group) => (
                                    <option key={group} value={group}>
                                        {group}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* District */}
                        <div>
                            <label htmlFor="register-district" className={labelClass}>
                                District
                            </label>

                            <select
                                id="register-district"
                                name="district"
                                value={selectedDistrict}
                                onChange={(e) =>
                                    setSelectedDistrict(e.target.value)
                                }
                                className={selectClass}
                                required
                            >
                                <option value="" disabled>
                                    Select district
                                </option>

                                {Object.keys(locationData).map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Upazila */}
                    <div>
                        <label htmlFor="register-upazila" className={labelClass}>
                            Upazila
                        </label>

                        <select
                            id="register-upazila"
                            name="upazila"
                            defaultValue=""
                            key={selectedDistrict}
                            className={selectClass}
                            disabled={!selectedDistrict}
                            required
                        >
                            <option value="" disabled>
                                Select upazila
                            </option>

                            {selectedDistrict &&
                                locationData[selectedDistrict].map((upazila) => (
                                    <option key={upazila} value={upazila}>
                                        {upazila}
                                    </option>
                                ))}
                        </select>

                        {!selectedDistrict && (
                            <p className="mt-1.5 text-xs text-gray-600">
                                Select a district first.
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn mt-2 w-full border-0 bg-red-600 text-base font-semibold text-white hover:bg-red-700 disabled:bg-red-300"
                    >
                        {loading ? "Please wait..." : "Create Account"}
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-6 text-center text-sm text-gray-700">
                    Already have an account?{" "}
                    <Link
                        to="/auth/login"
                        className="font-bold text-red-700 hover:text-red-800 hover:underline"
                    >
                        Login
                    </Link>
                </p>

                <p className="mt-5 text-center text-xs leading-5 text-gray-500">
                    Every drop counts. Your donation can save a life.
                </p>
            </div>
        </main>
    );
};

export default Register;
