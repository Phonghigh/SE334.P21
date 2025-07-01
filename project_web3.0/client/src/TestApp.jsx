import React, { useState } from "react";

const TestApp = () => {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Web3 Test App</h1>
          <div className="space-x-4">
            {["Home", "Market", "Exchange", "Tutorials", "Wallets", "Login"].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item.toLowerCase())}
                className={`text-white px-3 py-1 rounded ${
                  currentPage === item.toLowerCase() ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto p-8">
        <div className="text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Current Page: {currentPage}</h2>
          <p className="text-gray-300">Navigation is working!</p>
          
          {currentPage === "market" && (
            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Market Page</h3>
              <p>Crypto market data would go here</p>
            </div>
          )}
          
          {currentPage === "exchange" && (
            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Exchange Page</h3>
              <p>Trading interface would go here</p>
            </div>
          )}
          
          {currentPage === "tutorials" && (
            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Tutorials Page</h3>
              <p>Learning resources would go here</p>
            </div>
          )}
          
          {currentPage === "wallets" && (
            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Wallets Page</h3>
              <p>Wallet information would go here</p>
            </div>
          )}
          
          {currentPage === "login" && (
            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Login Page</h3>
              <p>Authentication form would go here</p>
            </div>
          )}
          
          {currentPage === "home" && (
            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Home Page</h3>
              <p>Welcome section would go here</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TestApp; 