// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to install react-router-dom

const Navbar = ({ navbarScrolled }) => {
    return (
        <div
            className={`navbar py-3 shadow-lg fixed w-full top-0 left-0 z-20 transition-colors duration-300 md:px-20 ${
                navbarScrolled
                    ? "bg-black bg-opacity-80 backdrop-blur-xl text-pink-500 font-medium"
                    : "bg-black bg-opacity-80 backdrop-blur-lg text-pink-500 font-medium"
            }`}
        >
            <div className="navbar-start flex items-center">
                {/* Dropdown for mobile view */}
                <div className="dropdown">
                    
                    <ul
                        tabIndex={0}
                        className={`menu menu-lg backdrop-blur-lg font-semibold dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow text-lg ${
                            navbarScrolled
                                ? "bg-black bg-opacity-95 text-pink-500 font-medium shadow-lg"
                                : "bg-black bg-opacity-95 text-pink-500 font-medium shadow-lg"
                        }`}
                    >
                        <li>
                            <Link
                                to="/matches"
                                className="text-lg hover:bg-pink-200 hover:text-white"
                            >
                                Matches
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/lists"
                                className="text-lg hover:bg-pink-200 hover:text-white"
                            >
                                Lists
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/messages"
                                className="text-lg hover:bg-pink-200 hover:text-white"
                            >
                                Messages
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link
                    to="/home"
                    className="flex items-center transform transition-transform duration-500 ease-in-out hover:scale-95"
                >
                   
                    <div className="text-3xl ml-5 hidden md:block">
                        <span className="text-pink-200 px-0 py-0 rounded-lg">
                            Dating App
                        </span>
                    </div>
                </Link>
            </div>

            {/* Centered links and right-aligned avatar and sign out button */}
            <div className="flex flex-grow justify-center space-x-10">
                <Link to="/matches" className="text-lg hover:text-pink-200 transition-all duration-200">
                    Matches
                </Link>
                <Link to="/lists" className="text-lg hover:text-pink-200 transition-all duration-200">
                    Lists
                </Link>
                <Link to="/messages" className="text-lg hover:text-pink-200 transition-all duration-200">
                    Messages
                </Link>
                <Link to="/profile" className="text-lg hover:text-pink-200 transition-all duration-200">
                    Profile
                </Link>
                <Link to="/settings" className="text-lg hover:text-pink-200 transition-all duration-200">
                    Settings
                </Link>
            </div>

            {/* Right-aligned section with avatar and sign out button */}
            <div className="hidden md:flex items-center space-x-4 ml-auto">
                {/* Avatar Section */}
                <div className="relative">
                    <img
                        src="https://randomuser.me/api/portraits/men/6.jpg" // Update the path to your avatar image
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full border-2 border-pink-500 cursor-pointer"
                    />
                    {/* Tooltip or dropdown can be implemented here if needed */}
                </div>

                <button className="btn btn-primary">Sign Out</button>
            </div>
        </div>
    );
};

export default Navbar;
