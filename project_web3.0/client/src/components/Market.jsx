import React, { useState } from "react";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiLitecoin, SiCardano } from "react-icons/si";

/**
 * Market Component
 * Displays cryptocurrency market data and prices
 */

const cryptoData = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 43250.50,
    change24h: 2.45,
    volume: "28.5B",
    icon: <FaBitcoin className="text-orange-500" />,
    marketCap: "847B"
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 2680.75,
    change24h: -1.23,
    volume: "15.2B",
    icon: <FaEthereum className="text-blue-500" />,
    marketCap: "322B"
  },
  {
    id: 3,
    name: "Litecoin",
    symbol: "LTC",
    price: 92.35,
    change24h: 4.67,
    volume: "2.1B",
    icon: <SiLitecoin className="text-gray-400" />,
    marketCap: "6.8B"
  },
  {
    id: 4,
    name: "Cardano",
    symbol: "ADA",
    price: 0.485,
    change24h: -2.14,
    volume: "890M",
    icon: <SiCardano className="text-blue-600" />,
    marketCap: "17.2B"
  }
];

const CryptoCard = ({ crypto }) => {
  const isPositive = crypto.change24h >= 0;
  
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{crypto.icon}</div>
          <div>
            <h3 className="text-white font-bold text-lg">{crypto.name}</h3>
            <p className="text-gray-300 text-sm">{crypto.symbol}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {isPositive ? <BiTrendingUp /> : <BiTrendingDown />}
          <span className="text-sm font-medium">{Math.abs(crypto.change24h)}%</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-300">Price:</span>
          <span className="text-white font-bold">${crypto.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Volume 24h:</span>
          <span className="text-white">${crypto.volume}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Market Cap:</span>
          <span className="text-white">${crypto.marketCap}</span>
        </div>
      </div>
      
      <button 
        type="button"
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Trade {crypto.symbol}
      </button>
    </div>
  );
};

const Market = () => {
  const [marketStats] = useState({
    totalMarketCap: "1.75T",
    volume24h: "89.5B",
    btcDominance: "48.2%",
    activeCoins: "2,435"
  });

  return (
    <div className="min-h-screen gradient-bg-services">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Crypto <span className="text-gradient">Market</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Track real-time cryptocurrency prices, market caps, and trading volumes
          </p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 text-center border border-white border-opacity-20">
            <h3 className="text-gray-300 text-sm">Total Market Cap</h3>
            <p className="text-white text-xl font-bold">${marketStats.totalMarketCap}</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 text-center border border-white border-opacity-20">
            <h3 className="text-gray-300 text-sm">24h Volume</h3>
            <p className="text-white text-xl font-bold">${marketStats.volume24h}</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 text-center border border-white border-opacity-20">
            <h3 className="text-gray-300 text-sm">BTC Dominance</h3>
            <p className="text-white text-xl font-bold">{marketStats.btcDominance}</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 text-center border border-white border-opacity-20">
            <h3 className="text-gray-300 text-sm">Active Coins</h3>
            <p className="text-white text-xl font-bold">{marketStats.activeCoins}</p>
          </div>
        </div>

        {/* Crypto Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cryptoData.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>

        {/* Market Trends */}
        <div className="mt-12 bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
          <h2 className="text-2xl font-bold text-white mb-6">Market Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-green-400 text-3xl mb-2">📈</div>
              <h3 className="text-white font-bold">Bullish Sentiment</h3>
              <p className="text-gray-300 text-sm">Market showing positive momentum</p>
            </div>
            <div className="text-center">
              <div className="text-blue-400 text-3xl mb-2">🔄</div>
              <h3 className="text-white font-bold">High Volume</h3>
              <p className="text-gray-300 text-sm">Increased trading activity</p>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 text-3xl mb-2">⚡</div>
              <h3 className="text-white font-bold">DeFi Growth</h3>
              <p className="text-gray-300 text-sm">Decentralized finance expansion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market; 