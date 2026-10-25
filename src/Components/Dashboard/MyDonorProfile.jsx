
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

const MyDonorProfile = () => {
    const { user } = use(AuthContext);

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
                    `http://localhost:3000/donors/uid/${user.uid}`
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
            } catch (err) {
                setError(err.message || "Profile load করতে সমস্যা হয়েছে");
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [user?.uid, user?.email]);

    // Handle input changes
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
                `http://localhost:3000/donors/uid/${user.uid}`,
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

    const handleCancel = () => {
        setIsEditing(false);
        setError("");
        setSuccess("");

        // Restore saved data from the database
        if (user?.uid) {
            setLoading(true);

            fetch(`http://localhost:3000/donors/uid/${user.uid}`)
                .then(async (response) => {
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
                })
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
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
                                        required={
                                            field.name !== "email"
                                        }
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
