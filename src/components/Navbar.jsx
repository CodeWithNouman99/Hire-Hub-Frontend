import { NavLink, Link } from "react-router-dom";
import { MapPin, LogIn, UserPlus, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const Links = [
    { name: "Home", path: "/" },
    { name: "Post Job", path: "/post-job" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const [location, setLocation] = useState("Location");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );

          const data = await response.json();

          let city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            data.address.state ||
            "Your Location";

          city = city
            .replace(/tehsil/gi, "")
            .replace(/district/gi, "")
            .trim();

          setLocation(city);
        } catch (error) {
          console.error(error);
          setLocation("Location");
        } finally {
          setLoadingLocation(false);
        }
      },
      () => {
        alert("Please allow location permission");
        setLoadingLocation(false);
      }
    );
  };

  return (
    <nav className="sticky top-2 z-50 px-3">
      {/* Desktop Navbar */}
      <div className="bg-white rounded-full min-h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between shadow-md border border-gray-200">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0 no-underline">
          <span className="text-lg sm:text-xl font-black bg-teal-500 text-white px-4 py-1.5 rounded-full">
            Hire
          </span>

          <span className="ml-1 text-lg sm:text-xl font-bold bg-linear-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
            Hub
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-2">
          {Links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 no-underline ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={getUserLocation}
            className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full bg-teal-50 text-sm text-teal-700 hover:bg-teal-100 transition"
          >
            <MapPin size={16} />
            <span className="max-w-30 truncate">
              {loadingLocation ? "Finding..." : location}
            </span>
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-teal-500 text-teal-600 rounded-full hover:bg-teal-50 transition">
                <LogIn size={16} />
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-teal-500 text-white rounded-full hover:bg-teal-600 transition">
                <UserPlus size={16} />
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 bg-white rounded-2xl shadow-lg border border-gray-200 w-full max-w-7xl mx-auto p-5">
          {/* Navigation */}
          <ul className="flex flex-col gap-2">
            {Links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-medium transition ${
                      isActive
                        ? "bg-teal-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="border-t my-4"></div>

          {/* Location */}
          <button
            onClick={getUserLocation}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition"
          >
            <MapPin size={18} />
            <span>{loadingLocation ? "Finding..." : location}</span>
          </button>

          {/* Authentication */}
          <div className="mt-4 flex flex-col gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full flex items-center justify-center gap-2 py-3 border border-teal-500 text-teal-600 rounded-full hover:bg-teal-50 transition">
                  <LogIn size={18} />
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition">
                  <UserPlus size={18} />
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;