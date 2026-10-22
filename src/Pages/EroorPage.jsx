
import { BiDroplet, BiHome } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { GiHeartTower } from "react-icons/gi";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  const isNotFound = error?.status === 404;

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-red-50 px-4 py-12">
      <div className="w-full max-w-3xl text-center">

        {/* Logo */}
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-200">
            <GiHeartTower size={25} fill="currentColor" />
          </div>

          <span className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            Blood <span className="text-red-600">Donation</span>
          </span>
        </Link>

        {/* Error Illustration */}
        <div className="relative mx-auto mb-6 flex h-44 w-44 items-center justify-center sm:h-56 sm:w-56">
          <div className="absolute inset-0 rounded-full bg-red-100" />

          <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-white bg-red-600 shadow-xl shadow-red-200 sm:h-48 sm:w-48">
            <BiDroplet
              size={100}
              strokeWidth={1.5}
              className="text-white sm:h-32 sm:w-32"
            />

            <span className="absolute bottom-3 right-0 rounded-full border-4 border-red-50 bg-white px-3 py-1 text-lg font-black text-red-600 sm:bottom-5 sm:text-xl">
              {isNotFound ? "404" : "Oops!"}
            </span>
          </div>

          <span className="absolute right-0 top-3 h-4 w-4 rounded-full bg-red-400 sm:right-2" />
          <span className="absolute bottom-5 left-0 h-3 w-3 rounded-full bg-red-300 sm:left-3" />
        </div>

        {/* Error Message */}
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-600">
          {isNotFound ? "Page Not Found" : "Something Went Wrong"}
        </p>

        <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
          {isNotFound
            ? "Oops! Lost in the Blood Bank?"
            : "We Couldn't Find Our Way!"}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
          {isNotFound
            ? "The page you're looking for doesn't exist or may have been moved. Let's get you back to saving lives!"
            : "Something unexpected happened while opening this page. Please try again or return to the homepage."}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="btn h-12 border-none bg-red-600 px-6 text-white shadow-lg shadow-red-200 hover:bg-red-700"
          >
            <BiHome size={19} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn h-12 border border-gray-300 bg-white px-6 text-gray-700 hover:border-red-300 hover:bg-red-50"
          >
            <BsArrowLeft size={19} />
            Go Back
          </button>
        </div>

        {/* Bottom Message */}
        <div className="mt-12 border-t border-red-100 pt-6">
          <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500">
            Every drop counts.
            <GiHeartTower
              size={16}
              className="text-red-500"
              fill="currentColor"
            />
            Every life matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
