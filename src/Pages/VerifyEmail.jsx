
import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { reload, signOut } from "firebase/auth";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const VerifyEmail = () => {
    const [loading, setLoading] = useState(false);
    const { setUser, auth } = use(AuthContext);
    const navigate = useNavigate();

    const handleVerify = async () => {
        setLoading(true);

        try {
            const user = auth.currentUser;

            if (!user) {
                alert("Please login first.");
                navigate("/auth/login");
                return;
            }

            // Refresh user's email verification status
            await reload(user);

            if (!auth.currentUser.emailVerified) {
                Swal.fire({
                    title: "Email এখনো verify হয়নি। Inbox থেকে verification link-এ click করো।",
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
                return;
            }

            const pendingDonor = localStorage.getItem("pendingDonor");

            if (!pendingDonor) {
                alert(
                    "Registration data পাওয়া যায়নি। আবার registration করতে হবে।"
                );
                return;
            }

            const donorData = JSON.parse(pendingDonor);
            donorData.uid = user.uid;

            // Save donor data only after email verification
            const response = await fetch(
                "https://blood-donation-server-silk.vercel.app/donors",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(donorData),
                }
            );

            if (!response.ok) {
                throw new Error("Donor data database-এ save করা যায়নি।");
            }

            localStorage.removeItem("pendingDonor");

            setUser(auth.currentUser);

            Swal.fire({
                title: "Email verified! Welcome to LifeDrop.",
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
            navigate("/dashboard");
        } catch (error) {
            console.error("Verification error:", error);
            alert(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            navigate("/auth/login");
        } catch (error) {
            console.error(error);
            alert("Logout করা যায়নি।");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:p-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                    <span className="text-3xl text-red-600">✉</span>
                </div>

                <h1 className="mt-4 text-2xl font-bold text-gray-900">
                    Verify Your Email
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                    তোর email inbox-এ পাঠানো verification link-এ click কর।
                    তারপর এই page-এ ফিরে এসে নিচের button চাপ।
                </p>

                <button
                    onClick={handleVerify}
                    disabled={loading}
                    className="btn mt-6 w-full border-0 bg-red-600 text-white hover:bg-red-700"
                >
                    {loading ? "Checking..." : "I've Verified My Email"}
                </button>

                <button
                    onClick={handleLogout}
                    className="btn btn-outline mt-3 w-full"
                >
                    Logout
                </button>

                <p className="mt-5 text-sm text-gray-500">
                    Already verified?{" "}
                    <button
                        type="button"
                        onClick={handleVerify}
                        className="font-semibold text-red-600 hover:underline"
                    >
                        Check now
                    </button>
                </p>

                <Link
                    to="/auth/login"
                    className="mt-4 inline-block text-sm text-gray-500 hover:text-red-600"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );
};

export default VerifyEmail;
