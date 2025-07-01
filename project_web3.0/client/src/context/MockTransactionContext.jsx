import React, { useState, useEffect } from "react";

/**
 * Mock Transaction Context for Frontend Testing
 * Simulates blockchain functionality without requiring real ETH or network connection
 * Perfect for UI testing and development
 */

export const MockTransactionContext = React.createContext();

export const MockTransactionsProvider = ({ children }) => {
  // Mock state - same structure as real context
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(5); // Mock count
  const [transactions, setTransactions] = useState([]);

  // Mock transaction data
  const mockTransactions = [
    {
      addressTo: "0x742d35Cc6634C0532925a3b8D1E2c442d4a5A3e4",
      addressFrom: "0x8ba1f109551bD432803012645Hac136c5B2Abb4E",
      timestamp: "12/21/2023, 4:33:21 PM",
      message: "Test transaction from mock context",
      keyword: "celebration",
      amount: 0.5
    },
    {
      addressTo: "0x742d35Cc6634C0532925a3b8D1E2c442d4a5A3e4",
      addressFrom: "0x8ba1f109551bD432803012645Hac136c5B2Abb4E", 
      timestamp: "12/21/2023, 4:32:15 PM",
      message: "Another mock transaction",
      keyword: "happy",
      amount: 1.2
    },
    {
      addressTo: "0x8ba1f109551bD432803012645Hac136c5B2Abb4E",
      addressFrom: "0x742d35Cc6634C0532925a3b8D1E2c442d4a5A3e4",
      timestamp: "12/21/2023, 4:30:45 PM", 
      message: "Mock payment for services",
      keyword: "money",
      amount: 2.1
    }
  ];

  // Mock wallet connection
  const connectWallet = async () => {
    console.log("🔗 Mock: Connecting wallet...");
    setIsLoading(true);
    
    // Simulate connection delay
    setTimeout(() => {
      setCurrentAccount("0x742d35Cc6634C0532925a3b8D1E2c442d4a5A3e4");
      setIsLoading(false);
      console.log("✅ Mock: Wallet connected successfully!");
    }, 1500);
  };

  // Mock form handling
  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // Mock transaction sending
  const sendTransaction = async () => {
    const { addressTo, amount, keyword, message } = formData;
    
    if (!addressTo || !amount || !keyword || !message) {
      alert("Please fill all fields");
      return;
    }

    console.log("🚀 Mock: Sending transaction...");
    setIsLoading(true);

    // Simulate transaction processing
    setTimeout(() => {
      const newTransaction = {
        addressTo,
        addressFrom: currentAccount,
        timestamp: new Date().toLocaleString(),
        message,
        keyword,
        amount: parseFloat(amount)
      };

      // Add to transactions list
      setTransactions(prev => [newTransaction, ...prev]);
      setTransactionCount(prev => prev + 1);
      
      // Clear form
      setformData({ addressTo: "", amount: "", keyword: "", message: "" });
      setIsLoading(false);
      
      console.log("✅ Mock: Transaction sent successfully!");
      console.log("📄 Transaction details:", newTransaction);
    }, 2000);
  };

  // Load mock data on mount
  useEffect(() => {
    setTransactions(mockTransactions);
  }, []);

  // Mock context value
  const contextValue = {
    transactionCount,
    connectWallet,
    transactions,
    currentAccount,
    isLoading,
    sendTransaction,
    handleChange,
    formData,
  };

  return (
    <MockTransactionContext.Provider value={contextValue}>
      {children}
    </MockTransactionContext.Provider>
  );
}; 