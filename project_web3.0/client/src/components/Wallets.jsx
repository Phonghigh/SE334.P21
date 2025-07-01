import React, { useState } from "react";
import { BiWallet, BiShield, BiMobile, BiDesktop, BiCloud, BiDownload } from "react-icons/bi";
import { FaChrome } from "react-icons/fa";

/**
 * Wallets Component
 * Showcase different cryptocurrency wallet options
 */

const wallets = [
  {
    id: 1,
    name: "MetaMask",
    type: "Browser Extension",
    description: "The most popular Ethereum wallet for browser and mobile",
    features: ["Browser Extension", "Mobile App", "Hardware Wallet Support", "DeFi Integration"],
    platforms: ["Chrome", "Firefox", "iOS", "Android"],
    security: "High",
    icon: <FaChrome className="text-orange-500" />,
    rating: 4.8,
    users: "30M+",
    downloadUrl: "https://metamask.io"
  },
  {
    id: 2,
    name: "Trust Wallet",
    type: "Mobile Wallet",
    description: "Multi-cryptocurrency wallet with built-in Web3 browser",
    features: ["Multi-Chain Support", "Staking", "NFT Storage", "DApp Browser"],
    platforms: ["iOS", "Android"],
    security: "High",
    icon: <BiMobile className="text-blue-500" />,
    rating: 4.7,
    users: "25M+",
    downloadUrl: "https://trustwallet.com"
  },
  {
    id: 3,
    name: "Ledger",
    type: "Hardware Wallet",
    description: "Cold storage hardware wallet for maximum security",
    features: ["Offline Storage", "Multi-Currency", "Secure Element", "Desktop App"],
    platforms: ["Hardware", "Desktop"],
    security: "Maximum",
    icon: <BiShield className="text-green-500" />,
    rating: 4.9,
    users: "4M+",
    downloadUrl: "https://ledger.com"
  },
  {
    id: 4,
    name: "Exodus",
    type: "Desktop Wallet",
    description: "Beautiful desktop wallet with built-in exchange",
    features: ["Built-in Exchange", "Portfolio Tracking", "24/7 Support", "Staking"],
    platforms: ["Windows", "Mac", "Linux", "Mobile"],
    security: "Medium",
    icon: <BiDesktop className="text-purple-500" />,
    rating: 4.6,
    users: "1M+",
    downloadUrl: "https://exodus.com"
  }
];

const WalletCard = ({ wallet }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getSecurityColor = (security) => {
    switch (security) {
      case "Maximum": return "text-green-400";
      case "High": return "text-blue-400";
      case "Medium": return "text-yellow-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-4xl">{wallet.icon}</div>
          <div>
            <h3 className="text-white font-bold text-xl">{wallet.name}</h3>
            <p className="text-gray-300 text-sm">{wallet.type}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 mb-1">
            <span className="text-yellow-400">★</span>
            <span className="text-white text-sm">{wallet.rating}</span>
          </div>
          <p className="text-gray-400 text-xs">{wallet.users} users</p>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{wallet.description}</p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-sm">Security Level:</span>
          <span className={`font-bold ${getSecurityColor(wallet.security)}`}>
            {wallet.security}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Platforms:</span>
          <div className="flex space-x-1">
            {wallet.platforms.map((platform, index) => (
              <span key={index} className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="mb-4">
          <h4 className="text-white font-medium mb-2">Key Features:</h4>
          <ul className="space-y-1">
            {wallet.features.map((feature, index) => (
              <li key={index} className="text-gray-300 text-sm flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => window.open(wallet.downloadUrl, "_blank")}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
        >
          <BiDownload className="mr-2" />
          Download
        </button>
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          {showDetails ? "Less" : "Details"}
        </button>
      </div>
    </div>
  );
};

const Wallets = () => {
  const [selectedType, setSelectedType] = useState("All");

  const walletTypes = ["All", "Browser Extension", "Mobile Wallet", "Hardware Wallet", "Desktop Wallet"];

  const filteredWallets = wallets.filter((wallet) => selectedType === "All" || wallet.type === selectedType);

  return (
    <div className="min-h-screen gradient-bg-services">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Crypto <span className="text-gradient">Wallets</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose the perfect wallet for your cryptocurrency needs
          </p>
        </div>

        {/* Wallet Type Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
            <h2 className="text-white font-bold text-lg mb-4">Filter by Type:</h2>
            <div className="flex flex-wrap gap-3">
              {walletTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedType === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wallets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredWallets.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} />
          ))}
        </div>

        {/* Security Tips */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <BiShield className="mr-2" />
            Security Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <BiShield className="text-4xl text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">Backup Your Seed</h3>
              <p className="text-gray-300 text-sm">Always backup your recovery phrase securely</p>
            </div>
            <div className="text-center">
              <BiCloud className="text-4xl text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">Use Hardware Wallets</h3>
              <p className="text-gray-300 text-sm">For large amounts, use cold storage solutions</p>
            </div>
            <div className="text-center">
              <BiWallet className="text-4xl text-purple-400 mx-auto mb-3" />
              <h3 className="text-white font-bold mb-2">Multiple Wallets</h3>
              <p className="text-gray-300 text-sm">Diversify across different wallet types</p>
            </div>
          </div>
        </div>

        {/* Wallet Comparison */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
          <h2 className="text-2xl font-bold text-white mb-6">Wallet Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 px-4">Wallet</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Security</th>
                  <th className="text-left py-3 px-4">Ease of Use</th>
                  <th className="text-left py-3 px-4">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-medium">MetaMask</td>
                  <td className="py-3 px-4 text-gray-300">Browser</td>
                  <td className="py-3 px-4 text-blue-400">High</td>
                  <td className="py-3 px-4 text-green-400">Easy</td>
                  <td className="py-3 px-4 text-gray-300">DeFi & Web3</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-medium">Trust Wallet</td>
                  <td className="py-3 px-4 text-gray-300">Mobile</td>
                  <td className="py-3 px-4 text-blue-400">High</td>
                  <td className="py-3 px-4 text-green-400">Easy</td>
                  <td className="py-3 px-4 text-gray-300">Mobile Trading</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-medium">Ledger</td>
                  <td className="py-3 px-4 text-gray-300">Hardware</td>
                  <td className="py-3 px-4 text-green-400">Maximum</td>
                  <td className="py-3 px-4 text-yellow-400">Moderate</td>
                  <td className="py-3 px-4 text-gray-300">Long-term Storage</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Exodus</td>
                  <td className="py-3 px-4 text-gray-300">Desktop</td>
                  <td className="py-3 px-4 text-yellow-400">Medium</td>
                  <td className="py-3 px-4 text-green-400">Very Easy</td>
                  <td className="py-3 px-4 text-gray-300">Beginners</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallets; 