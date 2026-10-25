
import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BiHeart } from "react-icons/bi";
import { AuthContext } from "../provider/AuthProvider";
import { sendEmailVerification } from "firebase/auth";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [loading, setLoading] = useState(false);

    const { CreateUser, setUser,  } = use(AuthContext);
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

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const formData = new FormData(form);

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const number = formData.get("number");
        const upazila = formData.get("upazila");
        const district = formData.get("district");
        const bloodGroup = formData.get("bloodGroup");

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

            alert(
                "Verification email sent! Check your inbox and click the verification link."
            );

            // Keep user signed in until verification is checked
            navigate("/verify-email");
        } catch (error) {
            console.error("Registration error:", error);

            if (error.code === "auth/email-already-in-use") {
                alert("এই email দিয়ে ইতিমধ্যে account তৈরি করা হয়েছে।");
            } else {
                alert(error.message || "Registration failed!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

                {/* Header */}
                <div className="mb-7 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                        <BiHeart className="text-3xl text-red-600" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Join Life<span className="text-red-600">Drop</span>
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Create your account and help save lives.
                    </p>
                </div>

                {/* Register Form */}
                <form onSubmit={handleRegister} className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className="input w-full border-gray-200 bg-white"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="input w-full border-gray-200 bg-white"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Create a password"
                            className="input w-full border-gray-200 bg-white"
                            minLength={6}
                            required
                        />

                        <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-gray-500">
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
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="number"
                            placeholder="01XXXXXXXXX"
                            className="input w-full border-gray-200 bg-white"
                            required
                        />
                    </div>

                    {/* Blood Group & District */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* Blood Group */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Blood Group
                            </label>

                            <select
                                name="bloodGroup"
                                defaultValue=""
                                className="select w-full border-gray-200 bg-white"
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
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                District
                            </label>

                            <select
                                name="district"
                                value={selectedDistrict}
                                onChange={(e) =>
                                    setSelectedDistrict(e.target.value)
                                }
                                className="select w-full border-gray-200 bg-white"
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
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Upazila
                        </label>

                        <select
                            name="upazila"
                            defaultValue=""
                            key={selectedDistrict}
                            className="select w-full border-gray-200 bg-white"
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
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn w-full border-0 bg-red-600 text-white hover:bg-red-700"
                    >
                        {loading ? "Please wait..." : "Create Account"}
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/auth/login"
                        className="font-semibold text-red-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>

                <p className="mt-5 text-center text-xs text-gray-400">
                    Every drop counts. Your donation can save a life.
                </p>
            </div>
        </div>
    );
};

export default Register;
