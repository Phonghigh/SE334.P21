import React, { useState } from "react";
import { BiTransfer, BiTrendingUp, BiWallet } from "react-icons/bi";
import { FaEthereum, FaBitcoin } from "react-icons/fa";

/**
 * Exchange Component
 * Cryptocurrency trading and swapping interface
 */

const Exchange = () => {
  const [fromCurrency, setFromCurrency] = useState("ETH");
  const [toCurrency, setToCurrency] = useState("BTC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const currencies = [
    { symbol: "ETH", name: "Ethereum", icon: <FaEthereum className="text-blue-500" />, price: 2680.75 },
    { symbol: "BTC", name: "Bitcoin", icon: <FaBitcoin className="text-orange-500" />, price: 43250.50 }
  ];

  const handleSwap = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    setFromAmount("");
    setToAmount("");
  };

  const calculateExchange = (amount) => {
    if (!amount) return "";
    const fromPrice = currencies.find((c) => c.symbol === fromCurrency)?.price || 0;
    const toPrice = currencies.find((c) => c.symbol === toCurrency)?.price || 0;
    const result = (parseFloat(amount) * fromPrice) / toPrice;
    return result.toFixed(6);
  };

  const handleFromAmountChange = (value) => {
    setFromAmount(value);
    setToAmount(calculateExchange(value));
  };

  return (
    <div className="min-h-screen gradient-bg-transactions">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Crypto <span className="text-gradient">Exchange</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Swap cryptocurrencies instantly with the best rates
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trading Interface */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <BiTransfer className="mr-2" />
              Instant Swap
            </h2>

            {/* From Currency */}
            <div className="mb-6">
              <label htmlFor="from-currency" className="block text-gray-300 text-sm mb-2">From</label>
              <div className="bg-black bg-opacity-30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <select
                    id="from-currency"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="bg-transparent text-white text-lg font-bold focus:outline-none"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.symbol} value={currency.symbol} className="bg-gray-800">
                        {currency.symbol}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center space-x-2">
                    {currencies.find((c) => c.symbol === fromCurrency)?.icon}
                    <span className="text-white font-medium">{fromCurrency}</span>
                  </div>
                </div>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent text-white text-2xl font-bold focus:outline-none"
                />
                <p className="text-gray-400 text-sm mt-1">
                  Balance: 0.00 {fromCurrency}
                </p>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={handleSwap}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-200"
              >
                <BiTransfer className="text-xl" />
              </button>
            </div>

            {/* To Currency */}
            <div className="mb-6">
              <label htmlFor="to-currency" className="block text-gray-300 text-sm mb-2">To</label>
              <div className="bg-black bg-opacity-30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <select
                    id="to-currency"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="bg-transparent text-white text-lg font-bold focus:outline-none"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.symbol} value={currency.symbol} className="bg-gray-800">
                        {currency.symbol}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center space-x-2">
                    {currencies.find((c) => c.symbol === toCurrency)?.icon}
                    <span className="text-white font-medium">{toCurrency}</span>
                  </div>
                </div>
                <input
                  type="number"
                  value={toAmount}
                  readOnly
                  placeholder="0.00"
                  className="w-full bg-transparent text-white text-2xl font-bold focus:outline-none"
                />
                <p className="text-gray-400 text-sm mt-1">
                  Balance: 0.00 {toCurrency}
                </p>
              </div>
            </div>

            {/* Exchange Rate */}
            <div className="bg-blue-600 bg-opacity-20 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Exchange Rate</span>
                <span className="text-white font-bold">
                  1 {fromCurrency} = {calculateExchange("1")} {toCurrency}
                </span>
              </div>
            </div>

            {/* Swap Button */}
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors duration-200"
            >
              Connect Wallet to Swap
            </button>
          </div>

          {/* Market Info */}
          <div className="space-y-6">
            {/* Price Chart Placeholder */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <BiTrendingUp className="mr-2" />
                Price Chart
              </h3>
              <div className="h-48 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Chart visualization coming soon</p>
              </div>
            </div>

            {/* Trading Stats */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <BiWallet className="mr-2" />
                Trading Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">24h Volume</span>
                  <span className="text-white font-bold">$2.4B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Trades</span>
                  <span className="text-white font-bold">1,234,567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Active Pairs</span>
                  <span className="text-white font-bold">245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Liquidity</span>
                  <span className="text-white font-bold">$890M</span>
                </div>
              </div>
            </div>

            {/* Popular Pairs */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
              <h3 className="text-xl font-bold text-white mb-4">Popular Pairs</h3>
              <div className="space-y-3">
                {[
                  { pair: "ETH/BTC", change: "+2.45%", volume: "$45M" },
                  { pair: "BTC/USDT", change: "-1.23%", volume: "$120M" },
                  { pair: "ETH/USDT", change: "+0.87%", volume: "$89M" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-600 last:border-b-0">
                    <div>
                      <p className="text-white font-medium">{item.pair}</p>
                      <p className="text-gray-400 text-sm">Vol: {item.volume}</p>
                    </div>
                    <span className={`font-bold ${item.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange; 