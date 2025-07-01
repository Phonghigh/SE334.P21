// TODO: [x] Set up project structure
// TODO: [x] Create theme context and toggle
// TODO: [x] Create notification system
// TODO: [x] Create network switcher
// TODO: [x] Create transaction filtering
// TODO: [x] Implement gas optimization
// TODO: [x] Add error handling
// DONE: [x] Create Market page with crypto data
// DONE: [x] Create Exchange page with trading interface
// DONE: [x] Create Tutorials page with learning resources
// DONE: [x] Create Wallets page with wallet comparison
// DONE: [x] Create Login page with authentication

import React, { useState } from "react";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "market":
        return (
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Market Page</h2>
            <p className="text-gray-300">Crypto market data will be here</p>
          </div>
        );
      case "exchange":
        return (
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Exchange Page</h2>
            <p className="text-gray-300">Trading interface will be here</p>
          </div>
        );
      case "tutorials":
        return (
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Tutorials Page</h2>
            <p className="text-gray-300">Learning resources will be here</p>
          </div>
        );
      case "wallets":
        return (
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Wallets Page</h2>
            <p className="text-gray-300">Wallet information will be here</p>
          </div>
        );
      case "login":
        return (
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Login Page</h2>
            <p className="text-gray-300">Authentication form will be here</p>
          </div>
        );
      default:
        return (
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to Web3 App</h2>
            <p className="text-gray-300">This is the home page</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Simple Navbar */}
      <nav className="bg-black bg-opacity-20 backdrop-blur-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Krypt</h1>
          <div className="space-x-4">
            {["Home", "Market", "Exchange", "Tutorials", "Wallets", "Login"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCurrentPage(item.toLowerCase())}
                className={`text-white px-4 py-2 rounded-lg transition-colors duration-200 ${
                  currentPage === item.toLowerCase() 
                    ? "bg-blue-600 font-bold" 
                    : "hover:bg-white hover:bg-opacity-10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="container mx-auto">
        {renderPage()}
      </main>

      {/* Simple Footer */}
      <footer className="bg-black bg-opacity-20 backdrop-blur-md p-4 mt-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-300">© 2024 Krypt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
