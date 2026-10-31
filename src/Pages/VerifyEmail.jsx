
import { use, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const API_URL = "https://blood-donation-server-silk.vercel.app";

const VerifyEmail = () => {
    const { auth, setUser } = use(AuthContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);

    const handleCheckVerification = async () => {
        if (loading || checking) return;

        setChecking(true);

        try {
            // 1. Firebase user check
            let user = auth.currentUser;

            if (!user) {
                await Swal.fire({
                    icon: "warning",
                    title: "Account not found",
                    text: "Please register again or log in.",
                });

                navigate("/auth/login", { replace: true });
                return;
            }

            // 2. Get latest email verification status
            await user.reload();
            user = auth.currentUser;

            if (!user?.emailVerified) {
                await Swal.fire({
                    icon: "info",
                    title: "Email not verified yet",
                    text: "Open your inbox and click the LifeDrop verification link.",
                });

                return;
            }

            // 3. Update AuthProvider user state
            setUser(user);

            // 4. Get pending donor data
            const pendingDonor = localStorage.getItem("pendingDonor");

            if (!pendingDonor) {
                await Swal.fire({
                    icon: "error",
                    title: "Registration data not found",
                    text: "Your saved registration data is missing from this browser. Please contact support.",
                });

                return;
            }

            let donorData;

            try {
                donorData = JSON.parse(pendingDonor);
            } catch (error) {
                console.error("Invalid pendingDonor JSON:", error);

                await Swal.fire({
                    icon: "error",
                    title: "Invalid registration data",
                    text: "Your saved donor information could not be read.",
                });

                return;
            }

            // 5. Prepare donor payload
            const payload = {
                ...donorData,
                uid: user.uid,
                email: user.email || donorData.email,
            };

            if (!payload.uid || !payload.email) {
                throw new Error("Firebase UID or email is missing.");
            }

            setLoading(true);

            // 6. Save donor data to backend
            const endpoint = `${API_URL}/donors`;

            console.log("Sending donor data to:", endpoint);

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const contentType = response.headers.get("content-type") || "";

            const result = contentType.includes("application/json")
                ? await response.json()
                : await response.text();

            console.log("Donor API response:", {
                url: endpoint,
                status: response.status,
                result,
            });

            if (!response.ok) {
                const message =
                    typeof result === "object" && result !== null
                        ? result.message
                        : result;

                if (response.status === 409) {
                    throw new Error(
                        message ||
                        "Donor profile already exists. Please log in and check your Dashboard."
                    );
                }

                throw new Error(
                    message ||
                    `Donor profile save failed. HTTP status: ${response.status}`
                );
            }

            // 7. Remove pending data after successful save
            localStorage.removeItem("pendingDonor");

            // 8. Show success message
            await Swal.fire({
                icon: "success",
                title: "Email verified!",
                text: "Your donor profile has been saved successfully.",
                confirmButtonText: "Go to Dashboard",
            });

            // 9. Navigate directly to Dashboard
            navigate("/dashboard", { replace: true });

        } catch (error) {
            console.error("Email verification / donor save error:", error);

            await Swal.fire({
                icon: "error",
                title: "Could not save donor profile",
                text:
                    error.message ||
                    "Something went wrong. Please try again.",
                confirmButtonText: "OK",
            });

        } finally {
            setLoading(false);
            setChecking(false);
        }
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-lg sm:p-8">

                <div className="mb-4 text-5xl" aria-hidden="true">
                    📩
                </div>

                <h1 className="mb-3 text-2xl font-bold sm:text-3xl">
                    Verify Your Email
                </h1>

                <p className="mb-6 text-sm leading-6 text-base-content/70 sm:text-base">
                    Check your inbox and click the LifeDrop verification link.
                    After verifying your email, click the button below.
                </p>

                <button
                    type="button"
                    onClick={handleCheckVerification}
                    disabled={loading || checking}
                    className="btn btn-primary w-full"
                >
                    {loading || checking ? (
                        <>
                            <span className="loading loading-spinner loading-sm" />
                            Please wait...
                        </>
                    ) : (
                        "I've Verified My Email"
                    )}
                </button>

                <p className="mt-4 text-xs text-base-content/60">
                    If verification succeeds but your donor profile is not saved,
                    check the browser Console and Network tabs.
                </p>

            </div>
        </div>
    );
};

export default VerifyEmail;
