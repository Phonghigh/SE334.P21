import React, { useState } from "react";
import { BiNetworkChart } from "react-icons/bi";

/**
 * Simple Network Switcher Component
 */
const NetworkSwitcher = () => {
  const [currentNetwork, setCurrentNetwork] = useState("Sepolia");

  const networks = ["Mainnet", "Sepolia", "Localhost"];

  const switchNetwork = (network) => {
    setCurrentNetwork(network);
    console.log(`Switching to ${network}`);
  };

  return (
    <div className="relative group">
      <button
        type="button"
        className="flex items-center space-x-2 px-3 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-105 bg-white bg-opacity-10 border-white border-opacity-20 text-white hover:bg-opacity-20"
      >
        <BiNetworkChart className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:block">
          {currentNetwork}
        </span>
      </button>

      {/* Dropdown on hover */}
      <div className="absolute top-full mt-2 right-0 bg-white bg-opacity-10 backdrop-blur-md rounded-lg border border-white border-opacity-20 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 min-w-[150px] z-50">
        <div className="p-2">
          {networks.map((network) => (
            <button
              key={network}
              type="button"
              onClick={() => switchNetwork(network)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                currentNetwork === network 
                  ? "bg-blue-500 bg-opacity-20 text-blue-300" 
                  : "text-white hover:bg-white hover:bg-opacity-10"
              }`}
            >
              {network}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkSwitcher; 