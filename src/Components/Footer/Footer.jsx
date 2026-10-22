import { Link } from "react-router";
import { BiDroplet } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <BiDroplet className="text-2xl text-red-500" />
          Blood<span className="text-red-500">LifeDrop</span>
        </Link>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-300">
          <Link to="/" className="transition hover:text-red-400">
            Home
          </Link>
          <Link to="/find-donors" className="transition hover:text-red-400">
            Find Donors
          </Link>
          <Link to="/about" className="transition hover:text-red-400">
            About
          </Link>
          <Link to="/contact" className="transition hover:text-red-400">
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} BloodBridge
        </p>

      </div>
    </footer>
  );
};

export default Footer;