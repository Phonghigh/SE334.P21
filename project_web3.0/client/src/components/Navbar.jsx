import React from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";
import NetworkSwitcher from "./NetworkSwitcher";

import logo from "../../images/logo.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>
    {title}
  </li>
);

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page.toLowerCase());
    setToggleMenu(false);
  };

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img 
          src={logo} 
          alt="logo" 
          className="w-16 h-16 cursor-pointer logo-rounded"
          onClick={() => handleNavigation('home')}
        />
      </div>
      
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <li 
            key={item + index}
            className={`mx-4 cursor-pointer hover:text-blue-400 transition-colors duration-200 ${
              currentPage === item.toLowerCase() ? 'text-blue-400 font-bold' : ''
            }`}
            onClick={() => handleNavigation(item)}
          >
            {item}
          </li>
        ))}
        <li 
          className={`bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] transition-colors duration-200 ${
            currentPage === 'login' ? 'bg-[#2546bd] font-bold' : ''
          }`}
          onClick={() => handleNavigation('Login')}
        >
          Login
        </li>
      </ul>

      {/* Theme Toggle and Network Switcher for desktop */}
      <div className="flex items-center space-x-3">
        <NetworkSwitcher />
        <ThemeToggle />
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          {toggleMenu
            ? <HiX fontSize={28} className="text-white cursor-pointer" onClick={() => setToggleMenu(false)} />
            : <HiMenuAlt4 fontSize={28} className="text-white cursor-pointer" onClick={() => setToggleMenu(true)} />}
        </div>
      </div>

      {/* Mobile menu */}
      {toggleMenu && (
        <ul className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
          <li className="text-xl w-full my-2">
            <HiX onClick={() => setToggleMenu(false)} className="cursor-pointer" />
          </li>
          {["Market", "Exchange", "Tutorials", "Wallets"].map(
            (item, index) => (
              <li 
                key={item + index}
                className="my-2 text-lg mx-4 cursor-pointer hover:text-blue-400 transition-colors duration-200"
                onClick={() => handleNavigation(item)}
              >
                {item}
              </li>
            )
          )}
          
          {/* Mobile theme and network controls */}
          <li className="w-full my-4 flex justify-center space-x-4">
            <NetworkSwitcher />
            <ThemeToggle />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
