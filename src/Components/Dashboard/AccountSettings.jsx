
import { use, useState } from "react";
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    deleteUser,
} from "firebase/auth";
import { AuthContext } from "../../provider/AuthProvider";
import {
    FaLock,
    FaEnvelope,
    FaTrashCan,
    FaEye,
} from "react-icons/fa6";
import Swal from "sweetalert2";

const AccountSettings = () => {
    const { user } = use(AuthContext);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswords, setShowPasswords] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Change Password
    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire("Error", "Please login first.", "error");
            return;
        }

        if (
            !user.providerData.some(
                (provider) => provider.providerId === "password"
            )
        ) {
            Swal.fire(
                "Not available",
                "এই account-এ Email/Password login চালু নেই।",
                "info"
            );
            return;
        }

        if (newPassword.length < 6) {
            Swal.fire(
                "Error",
                "Password কমপক্ষে ৬ অক্ষরের হতে হবে।",
                "error"
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire(
                "Error",
                "নতুন Password দুটি মিলছে না।",
                "error"
            );
            return;
        }

        setLoading(true);

        try {
            const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
            );

            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            await Swal.fire(
                "Success!",
                "তোমার Password সফলভাবে পরিবর্তন হয়েছে।",
                "success"
            );
        } catch (error) {
            console.error(error);

            let message = "Password পরিবর্তন করা যায়নি।";

            if (
                [
                    "auth/invalid-credential",
                    "auth/wrong-password",
                    "auth/invalid-login-credentials",
                ].includes(error.code)
            ) {
                message = "বর্তমান Password সঠিক নয়।";
            } else if (error.code === "auth/weak-password") {
                message = "আরও শক্তিশালী Password দাও।";
            } else if (
                error.code === "auth/requires-recent-login"
            ) {
                message = "আবার Login করে চেষ্টা করো।";
            }

            Swal.fire("Error", message, "error");
        } finally {
            setLoading(false);
        }
    };

    // Permanently Delete Account
    const handleDeleteAccount = async () => {
        if (!user) {
            Swal.fire("Error", "Please login first.", "error");
            return;
        }

        // First confirmation
        const confirmation = await Swal.fire({
            title: "তুমি কি নিশ্চিত?",
            text: "তোমার LifeDrop account স্থায়ীভাবে মুছে যাবে। এই কাজ ফিরিয়ে নেওয়া যাবে না।",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "হ্যাঁ, Delete করো",
            cancelButtonText: "না, ফিরে যাই",
            confirmButtonColor: "#dc2626",
            reverseButtons: true,
            focusCancel: true,
        });

        if (!confirmation.isConfirmed) return;

        // Second confirmation
        const finalConfirmation = await Swal.fire({
            title: "শেষবারের মতো নিশ্চিত করো",
            text: "নিশ্চিত হলে নিচে DELETE লিখো।",
            icon: "error",
            input: "text",
            inputLabel: "Type DELETE to continue",
            inputPlaceholder: "DELETE",
            showCancelButton: true,
            confirmButtonText: "Permanently Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#b91c1c",
            preConfirm: (value) => {
                if (value !== "DELETE") {
                    Swal.showValidationMessage(
                        'ঠিক "DELETE" লিখতে হবে।'
                    );
                    return false;
                }

                return true;
            },
        });

        if (!finalConfirmation.isConfirmed) return;

        setDeleting(true);

        try {
            /*
             * First delete the donor profile from MongoDB.
             * This route is currently an unverified development route.
             */
            const response = await fetch(
                `http://localhost:3000/donors/uid/${user.uid}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message || "Donor profile delete করা যায়নি।"
                );
            }

            /*
             * Then delete the Firebase Authentication account.
             * Recent login may be required by Firebase.
             */
            await deleteUser(user);

            await Swal.fire({
                title: "Account Deleted",
                text: "তোমার LifeDrop account delete হয়েছে।",
                icon: "success",
                confirmButtonColor: "#dc2626",
            });

            window.location.replace("/");
        } catch (error) {
            console.error("Account deletion error:", error);

            let message =
                error.message || "Account delete করতে সমস্যা হয়েছে।";

            if (error.code === "auth/requires-recent-login") {
                message =
                    "নিরাপত্তার জন্য আবার Login করে তারপর account delete করো।";
            }

            await Swal.fire("Delete Failed", message, "error");
        } finally {
            setDeleting(false);
        }
    };

    if (!user) {
        return (
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 text-center text-gray-600">
                Please login to manage your account.
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-1">
            {/* Page Heading */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Account Settings
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    Manage your account and password.
                </p>
            </div>

            {/* Account Information */}
            <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <FaEnvelope />
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800">
                            Account Information
                        </h3>
                        <p className="text-sm text-gray-500">
                            Your registered email address
                        </p>
                    </div>
                </div>

                <label
                    htmlFor="accountEmail"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Email Address
                </label>

                <input
                    id="accountEmail"
                    type="email"
                    value={user.email || ""}
                    readOnly
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
                />
            </section>

            {/* Change Password */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <FaLock />
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800">
                            Change Password
                        </h3>
                        <p className="text-sm text-gray-500">
                            Update your account password
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handlePasswordChange}
                    className="space-y-4"
                >
                    {[
                        {
                            label: "Current Password",
                            name: "currentPassword",
                            value: currentPassword,
                            setter: setCurrentPassword,
                            autocomplete: "current-password",
                        },
                        {
                            label: "New Password",
                            name: "newPassword",
                            value: newPassword,
                            setter: setNewPassword,
                            autocomplete: "new-password",
                        },
                        {
                            label: "Confirm New Password",
                            name: "confirmPassword",
                            value: confirmPassword,
                            setter: setConfirmPassword,
                            autocomplete: "new-password",
                        },
                    ].map((field) => (
                        <div key={field.name}>
                            <label
                                htmlFor={field.name}
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                {field.label}
                            </label>

                            <input
                                id={field.name}
                                name={field.name}
                                type={showPasswords ? "text" : "password"}
                                value={field.value}
                                onChange={(e) =>
                                    field.setter(e.target.value)
                                }
                                autoComplete={field.autocomplete}
                                minLength={
                                    field.name === "currentPassword"
                                        ? undefined
                                        : 6
                                }
                                required
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                            />
                        </div>
                    ))}

                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-500">
                        <input
                            type="checkbox"
                            checked={showPasswords}
                            onChange={(e) =>
                                setShowPasswords(e.target.checked)
                            }
                            className="h-4 w-4 accent-red-600"
                        />
                        <FaEye />
                        Show passwords
                    </label>

                    <button
                        type="submit"
                        disabled={loading || deleting}
                        className="w-full rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </section>

            {/* Permanent Delete Account */}
            <section className="mt-6 rounded-2xl border border-red-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <FaTrashCan />
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-gray-800">
                            Delete Account Permanently
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            তোমার LifeDrop account এবং donor profile
                            স্থায়ীভাবে delete করার জন্য এই option ব্যবহার করো।
                            এই কাজ ফিরিয়ে নেওয়া যাবে না।
                        </p>

                        <button
                            type="button"
                            onClick={handleDeleteAccount}
                            disabled={deleting || loading}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            <FaTrashCan />
                            {deleting
                                ? "Deleting Account..."
                                : "Delete My Account"}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AccountSettings;
