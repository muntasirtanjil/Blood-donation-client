
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebase.config";

const API_URL = "https://blood-donation-server-silk.vercel.app";

const VerifyEmail = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);

    const handleCheckVerification = async () => {
        try {
            setChecking(true);

            const user = auth.currentUser;

            if (!user) {
                await Swal.fire({
                    icon: "warning",
                    title: "Login required",
                    text: "Please register or log in again.",
                });

                navigate("/auth/login");
                return;
            }

            // Firebase থেকে সর্বশেষ verification status নেওয়া
            await user.reload();

            const updatedUser = auth.currentUser;

            if (!updatedUser?.emailVerified) {
                await Swal.fire({
                    icon: "info",
                    title: "Email not verified yet",
                    text: "Please verify your email using the link sent to your inbox.",
                });
                return;
            }

            const pendingDonor = localStorage.getItem("pendingDonor");

            if (!pendingDonor) {
                await Swal.fire({
                    icon: "warning",
                    title: "Donor information not found",
                    text: "Your registration information was not found in this browser. Please contact support or register again if needed.",
                });
                return;
            }

            let donorData;

            try {
                donorData = JSON.parse(pendingDonor);
            } catch (error) {
                console.error("Invalid pendingDonor data:", error);

                await Swal.fire({
                    icon: "error",
                    title: "Invalid registration data",
                    text: "Your saved registration information could not be read.",
                });
                return;
            }

            // Firebase user ID যুক্ত করা
            const payload = {
                ...donorData,
                uid: updatedUser.uid,
                email: updatedUser.email || donorData.email,
            };

            if (!payload.uid || !payload.email) {
                throw new Error("Firebase UID or email is missing.");
            }

            setLoading(true);

            // Donor profile MongoDB backend-এ পাঠানো
            const response = await fetch(`${API_URL}/donors`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            // Backend-এর response পড়া
            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                console.error("Donor save failed:", {
                    status: response.status,
                    response: result,
                });

                if (response.status === 409) {
                    throw new Error(
                        "এই Firebase account-এর donor profile আগে থেকেই আছে। Login করে Dashboard দেখ।"
                    );
                }

                throw new Error(
                    result.message ||
                    `Donor profile save failed. HTTP status: ${response.status}`
                );
            }

            console.log("Donor saved successfully:", result);

            // Save সফল হলেই pending data মুছে ফেলা
            localStorage.removeItem("pendingDonor");

            await Swal.fire({
                icon: "success",
                title: "Email verified!",
                text: "Your donor profile has been saved successfully.",
                confirmButtonText: "Go to Dashboard",
            });

            navigate("/dashboard");
        } catch (error) {
            console.error("Email verification/profile save error:", error);

            await Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text:
                    error.message ||
                    "Donor profile save করা যায়নি। আবার চেষ্টা কর।",
            });
        } finally {
            setLoading(false);
            setChecking(false);
        }
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-lg sm:p-8">
                <div className="mb-4 text-5xl">📩</div>

                <h1 className="mb-3 text-2xl font-bold sm:text-3xl">
                    Verify Your Email
                </h1>

                <p className="mb-6 text-sm leading-6 text-base-content/70 sm:text-base">
                    Email inbox থেকে LifeDrop-এর verification link-এ click কর।
                    Verification সম্পন্ন হলে নিচের button-এ click কর।
                </p>

                <button
                    type="button"
                    onClick={handleCheckVerification}
                    disabled={loading || checking}
                    className="btn btn-primary w-full"
                >
                    {loading || checking ? (
                        <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Please wait...
                        </>
                    ) : (
                        "I've Verified My Email"
                    )}
                </button>

                <p className="mt-4 text-xs text-base-content/60">
                    Verification-এর পরও সমস্যা হলে browser Console-এর error দেখ।
                </p>
            </div>
        </div>
    );
};

export default VerifyEmail;
