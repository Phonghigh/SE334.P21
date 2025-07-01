import React from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

/**
 * Theme Toggle Component with enhanced styling
 */
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-3 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-110 ${
        isDark 
          ? "bg-white bg-opacity-10 border-white border-opacity-20 text-white hover:bg-opacity-20" 
          : "bg-gray-800 bg-opacity-10 border-gray-600 border-opacity-30 text-gray-800 hover:bg-opacity-20"
      }`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <BsSun className="w-5 h-5 transform rotate-0 transition-transform duration-300" />
        ) : (
          <BsMoon className="w-5 h-5 transform rotate-0 transition-transform duration-300" />
        )}
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </div>
    </button>
  );
};

export default ThemeToggle; 