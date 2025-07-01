import React, { useState } from "react";
import { BiUser, BiLock, BiShow, BiHide, BiWallet } from "react-icons/bi";
import { FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";

/**
 * Login Component
 * User authentication and wallet connection
 */

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login attempt:", { email: formData.email, password: formData.password });
    } else {
      console.log("Register attempt:", formData);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Wallet connected successfully");
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install MetaMask to connect your wallet");
    }
  };

  return (
    <div className="min-h-screen gradient-bg-transactions flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {isLogin ? "Welcome Back" : "Join Us"}
            </h1>
            <p className="text-gray-300">
              {isLogin ? "Sign in to your account" : "Create your Web3 account"}
            </p>
          </div>

          {/* Login/Register Form */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 border border-white border-opacity-20 mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full bg-black bg-opacity-30 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <BiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full bg-black bg-opacity-30 text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <BiHide /> : <BiShow />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (Register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <BiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="w-full bg-black bg-opacity-30 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-300 text-sm">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors duration-200"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Toggle Login/Register */}
            <div className="text-center mt-6">
              <p className="text-gray-300">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="w-full bg-white bg-opacity-10 backdrop-blur-md text-white py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-opacity-20 flex items-center justify-center border border-white border-opacity-20"
            >
              <FaGoogle className="mr-3 text-red-400" />
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full bg-white bg-opacity-10 backdrop-blur-md text-white py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-opacity-20 flex items-center justify-center border border-white border-opacity-20"
            >
              <FaGithub className="mr-3 text-gray-400" />
              Continue with GitHub
            </button>
            <button
              type="button"
              className="w-full bg-white bg-opacity-10 backdrop-blur-md text-white py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-opacity-20 flex items-center justify-center border border-white border-opacity-20"
            >
              <FaTwitter className="mr-3 text-blue-400" />
              Continue with Twitter
            </button>
          </div>

          {/* Wallet Connection */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <BiWallet className="mr-2" />
              Connect Wallet
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Connect your Web3 wallet to access decentralized features
            </p>
            <button
              type="button"
              onClick={connectWallet}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-bold transition-colors duration-200"
            >
              Connect MetaMask
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">
              By signing in, you agree to our{" "}
              <button type="button" className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </button>{" "}
              and{" "}
              <button type="button" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 