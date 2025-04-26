import { FaUsers, FaClipboardList, FaThLarge } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col">
      {/* Rotating Logo */}
      <motion.div
        className="flex justify-center items-center my-6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        style={{ width: "80px", height: "80px" }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </motion.div>

      <div className="mt-[-40px] p-6 text-xl font-bold text-[#8b5e3c]">
        Vital Health System
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 mt-[-20px]">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-2 rounded hover:bg-gray-100 ${
              isActive ? "bg-gray-200 font-bold text-[#8b5e3c]" : ""
            }`
          }
        >
          <FaThLarge className="text-3xl" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/program"
          className={({ isActive }) =>
            `flex items-center my-6 space-x-3 p-2 rounded hover:bg-gray-100 ${
              isActive ? "bg-gray-200 font-bold text-[#8b5e3c]" : ""
            }`
          }
        >
          <FaClipboardList className="text-3xl" />
          <span>Programs</span>
        </NavLink>

        <NavLink
          to="/client"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-2 rounded hover:bg-gray-100 ${
              isActive ? "bg-gray-200 font-bold text-[#8b5e3c]" : ""
            }`
          }
        >
          <FaUsers className="text-3xl" />
          <span>Client</span>
        </NavLink>
      </nav>

      {/* Sign Out */}
      <a
        href="#"
        className="flex items-center space-x-3 p-2 rounded hover:bg-gray-100 mt-auto"
      >
        <CiLogout className="text-4xl" />
        <span>Sign Out</span>
      </a>
    </div>
  );
}

export default Sidebar;
