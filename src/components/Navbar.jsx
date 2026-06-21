import { NavLink, Link } from "react-router-dom";
import { MapPin, LogIn, UserPlus } from "lucide-react";
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
    // { name: "Find Jobs", path: "/find-jobs" },
    { name: "Post Job", path: "/post-job" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];


  // location ko dynamically krne k liye 

  const [location, setLocation] = useState("Location");
  const [loadingLocation, setLoadingLocation] = useState(false);

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

          setLocation(city);
        } catch (error) {
          setLocation("Location found", error);
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
    <nav className="sticky top-4 z-50">
      <div className="bg-white rounded-full h-16 w-[96%] max-w-7xl mx-auto flex items-center justify-between px-5 shadow-md border border-gray-200">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-0 no-underline">
          <span className="text-xl font-black bg-teal-500 text-white px-4 py-1.5 rounded-full">
            Hire
          </span>

          <span className="ml-1 text-xl font-bold bg-linear-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
            Hub
          </span>
        </Link>

        {/*  Links  wagera yaha*/}
        <ul className="hidden md:flex items-center gap-2">
          {Links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 no-underline ${isActive
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

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Location */}
          <button
            onClick={getUserLocation}
            className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full bg-teal-50 text-sm text-teal-700 hover:bg-teal-100 transition"
          >
            <MapPin size={16} />
            <span>{loadingLocation ? "Finding..." : location}</span>
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition">
                <LogIn size={16} />
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-teal-500 text-white rounded-full hover:bg-teal-600 transition">
                <UserPlus size={16} />
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          {/* agr me login ho to buttons show nai honge but me chahta ho k buttons b show ho the ye code */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;