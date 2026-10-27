
import { use, useEffect, useState } from "react";
import {
    FaUser,
    FaDroplet,
    FaPhone,
    FaLocationDot,
    FaEnvelope,
    FaPen,
} from "react-icons/fa6";
import { AuthContext } from "../../provider/AuthProvider";

const API_URL =  "https://blood-donation-server-silk.vercel.app";

    const MyDonorProfile = () => {
        const { user } = use(AuthContext);

        const [isEditing, setIsEditing] = useState(false);
        const [loading, setLoading] = useState(true);
        const [saving, setSaving] = useState(false);
        const [availabilitySaving, setAvailabilitySaving] = useState(false);
        const [error, setError] = useState("");
        const [success, setSuccess] = useState("");

        const [available, setAvailable] = useState(true);

        const [profile, setProfile] = useState({
            name: "",
            email: "",
            number: "",
            bloodGroup: "",
            district: "",
            upazila: "",
        });

        // Load donor profile from MongoDB
        useEffect(() => {
            if (!user?.uid) {
                setLoading(false);
                return;
            }

            const loadProfile = async () => {
                setLoading(true);
                setError("");

                try {
                    const response = await fetch(
                        `${API_URL}/donors/uid/${user.uid}`
                    );

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(
                            data.message || "Profile load করা যায়নি"
                        );
                    }

                    setProfile({
                        name: data.name || "",
                        email: data.email || user.email || "",
                        number: data.number || "",
                        bloodGroup: data.bloodGroup || "",
                        district: data.district || "",
                        upazila: data.upazila || "",
                    });

                    // পুরোনো donor document-এ available না থাকলে Available ধরবে
                    setAvailable(
                        typeof data.available === "boolean"
                            ? data.available
                            : true
                    );
                } catch (err) {
                    setError(err.message || "Profile load করতে সমস্যা হয়েছে");
                } finally {
                    setLoading(false);
                }
            };

            loadProfile();
        }, [user?.uid, user?.email]);

        // Handle profile input changes
        const handleChange = (e) => {
            const { name, value } = e.target;

            setProfile((previousProfile) => ({
                ...previousProfile,
                [name]: value,
            }));
        };

        // Update profile in MongoDB
        const handleSave = async (e) => {
            e.preventDefault();

            if (!user?.uid) {
                setError("Profile update করতে আগে login করো।");
                return;
            }

            setSaving(true);
            setError("");
            setSuccess("");

            try {
                const response = await fetch(
                    `${API_URL}/donors/uid/${user.uid}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: profile.name,
                            number: profile.number,
                            bloodGroup: profile.bloodGroup,
                            district: profile.district,
                            upazila: profile.upazila,
                        }),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Profile update করা যায়নি"
                    );
                }

                setIsEditing(false);
                setSuccess("Profile updated successfully!");
            } catch (err) {
                setError(err.message || "Profile update করতে সমস্যা হয়েছে");
            } finally {
                setSaving(false);
            }
        };

        // Restore saved profile data when cancelling edit
        const handleCancel = async () => {
            setIsEditing(false);
            setError("");
            setSuccess("");

            if (!user?.uid) return;

            setLoading(true);

            try {
                const response = await fetch(
                    `${API_URL}/donors/uid/${user.uid}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Profile load করা যায়নি"
                    );
                }

                setProfile({
                    name: data.name || "",
                    email: data.email || user.email || "",
                    number: data.number || "",
                    bloodGroup: data.bloodGroup || "",
                    district: data.district || "",
                    upazila: data.upazila || "",
                });

                setAvailable(
                    typeof data.available === "boolean"
                        ? data.available
                        : true
                );
            } catch (err) {
                setError(err.message || "Profile load করতে সমস্যা হয়েছে");
            } finally {
                setLoading(false);
            }
        };

        // Toggle donor availability and save to MongoDB
        const handleAvailabilityChange = async () => {
            if (!user?.uid || availabilitySaving) return;

            const newAvailability = !available;

            setAvailabilitySaving(true);
            setError("");
            setSuccess("");

            try {
                const response = await fetch(
                    `${API_URL}/donors/uid/${user.uid}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            available: newAvailability,
                        }),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Availability update করা যায়নি"
                    );
                }
                // console.log("Saved availability:", data);
                setAvailable(newAvailability);


                setSuccess(
                    newAvailability
                        ? "You are now available for blood donation."
                        : "You are now unavailable for blood donation."
                );
            } catch (err) {
                setError(
                    err.message || "Availability update করতে সমস্যা হয়েছে"
                );
            } finally {
                setAvailabilitySaving(false);
            }
        };

        const fields = [
            {
                label: "Full Name",
                name: "name",
                icon: <FaUser />,
                type: "text",
            },
            {
                label: "Email Address",
                name: "email",
                icon: <FaEnvelope />,
                type: "email",
            },
            {
                label: "Phone Number",
                name: "number",
                icon: <FaPhone />,
                type: "tel",
            },
            {
                label: "Blood Group",
                name: "bloodGroup",
                icon: <FaDroplet />,
                type: "text",
            },
            {
                label: "District",
                name: "district",
                icon: <FaLocationDot />,
                type: "text",
            },
            {
                label: "Upazila",
                name: "upazila",
                icon: <FaLocationDot />,
                type: "text",
            },
        ];

        if (loading) {
            return (
                <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 text-center text-gray-500">
                    Loading profile...
                </div>
            );
        }

        if (!user?.uid) {
            return (
                <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 text-center">
                    <p className="font-medium text-gray-700">
                        Please login to view your donor profile.
                    </p>
                </div>
            );
        }

        return (
            <div className="mx-auto max-w-4xl">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        My Donor Profile
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        View and manage your blood donor information.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {/* Profile Header */}
                    <div className="flex flex-col gap-4 bg-red-50 p-6 sm:flex-row sm:items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600">
                            <FaUser />
                        </div>

                        <div className="min-w-0 flex-1">
                            <h3 className="break-words text-xl font-bold text-gray-800">
                                {profile.name || "Donor Name"}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                {profile.bloodGroup || "Blood Group Not Set"}
                            </p>

                            <div className="mt-2">
                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${available
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {available
                                        ? "● Available for Donation"
                                        : "● Currently Unavailable"}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                if (isEditing) {
                                    handleCancel();
                                } else {
                                    setIsEditing(true);
                                    setError("");
                                    setSuccess("");
                                }
                            }}
                            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                            <FaPen />
                            {isEditing ? "Cancel Edit" : "Edit Profile"}
                        </button>
                    </div>

                    {/* Donor Availability */}
                    <div className="border-b border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-800">
                            Donation Availability
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Donating blood is your choice. Change your status
                            whenever you are not available to donate.
                        </p>

                        <div className="mt-4 flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="font-semibold text-gray-800">
                                    {available
                                        ? "You are available to donate"
                                        : "You are not available to donate"}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    {available
                                        ? "Your profile can appear in available donor searches."
                                        : "Your profile will be excluded when users filter available donors only."}
                                </p>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={available}
                                aria-label="Toggle donation availability"
                                onClick={handleAvailabilityChange}
                                disabled={availabilitySaving}
                                className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${available ? "bg-green-600" : "bg-gray-300"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${available
                                        ? "translate-x-7"
                                        : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>

                        {availabilitySaving && (
                            <p className="mt-2 text-sm text-gray-500">
                                Updating availability...
                            </p>
                        )}
                    </div>

                    {/* Profile Form */}
                    <form onSubmit={handleSave} className="p-6">
                        {error && (
                            <p
                                role="alert"
                                className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
                            >
                                {error}
                            </p>
                        )}

                        {success && (
                            <p
                                role="status"
                                className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700"
                            >
                                {success}
                            </p>
                        )}

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            {fields.map((field) => (
                                <div key={field.name}>
                                    <label
                                        htmlFor={field.name}
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        {field.label}
                                    </label>

                                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 focus-within:border-red-400">
                                        <span className="text-red-500">
                                            {field.icon}
                                        </span>

                                        <input
                                            id={field.name}
                                            type={field.type}
                                            name={field.name}
                                            value={profile[field.name]}
                                            onChange={handleChange}
                                            readOnly={
                                                !isEditing ||
                                                field.name === "email"
                                            }
                                            required={field.name !== "email"}
                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                            className="w-full min-w-0 bg-transparent py-3 text-sm outline-none read-only:text-gray-500"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {isEditing && (
                            <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={saving}
                                    className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        );
    };

export default MyDonorProfile;
