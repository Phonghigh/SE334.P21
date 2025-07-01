import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

// Create React context for managing transaction state across the application
export const TransactionContext = React.createContext();

// Get ethereum object from window (injected by MetaMask)
const { ethereum } = window;

/**
 * Create and return an instance of the smart contract
 * @returns {ethers.Contract} Configured contract instance ready for interaction
 * 
 * This function sets up the Web3 provider using MetaMask, gets the signer (current user),
 * and creates a contract instance that can be used to interact with our deployed smart contract
 */
const createEthereumContract = () => {
  // Create Web3 provider using MetaMask's ethereum object
  const provider = new ethers.providers.Web3Provider(ethereum);
  
  // Get the signer (current connected wallet) to sign transactions
  const signer = provider.getSigner();
  
  // Create contract instance with address, ABI, and signer
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

/**
 * TransactionsProvider Component
 * Provides transaction-related state and functions to child components
 * Manages wallet connection, transaction sending, and transaction history
 */
export const TransactionsProvider = ({ children }) => {
  // Form data state for transaction inputs (recipient address, amount, keyword, message)
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  
  // Currently connected wallet address
  const [currentAccount, setCurrentAccount] = useState("");
  
  // Loading state for transaction processing
  const [isLoading, setIsLoading] = useState(false);
  
  // Total number of transactions (persisted in localStorage)
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  
  // Array of all fetched transactions from the blockchain
  const [transactions, setTransactions] = useState([]);

  /**
   * Handle form input changes
   * @param {Event} e - Input change event
   * @param {string} name - Name of the form field being updated
   * Updates the form data state with new input values
   */
  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  /**
   * Fetch all transactions from the smart contract
   * Retrieves transaction history and formats it for display in the UI
   */
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        // Create contract instance
        const transactionsContract = createEthereumContract();

        // Call smart contract method to get all transactions
        const availableTransactions = await transactionsContract.getAllTransactions();

        // Transform raw blockchain data into formatted objects for UI consumption
        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,                                              // Recipient address
          addressFrom: transaction.sender,                                             // Sender address
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(), // Convert Unix timestamp to readable date
          message: transaction.message,                                                // Custom message
          keyword: transaction.keyword,                                                // Keyword for GIF
          amount: parseInt(transaction.amount._hex) / (10 ** 18)                      // Convert wei to ETH
        }));

        console.log(structuredTransactions);

        // Update state with formatted transactions
        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Check if a wallet is already connected
   * Called on app initialization to restore connection state
   */
  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      // Request account information from MetaMask (doesn't trigger connection popup)
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        // If accounts exist, user is already connected
        setCurrentAccount(accounts[0]);

        // Fetch transaction history for connected account
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Check if transactions exist in the smart contract
   * Updates local storage with current transaction count for persistence
   */
  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        // Create contract instance and get current transaction count
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        // Store transaction count in localStorage for persistence across sessions
        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  /**
   * Initiate wallet connection
   * Prompts user to connect their MetaMask wallet
   */
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      // Request account access from user (triggers MetaMask popup)
      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      // Set the first account as current account
      setCurrentAccount(accounts[0]);
      
      // Reload page to update UI state
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  /**
   * Send a transaction with custom message and keyword
   * Handles both the ETH transfer and smart contract interaction
   */
  const sendTransaction = async () => {
    try {
      if (ethereum) {
        // Extract form data
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        
        // Convert ETH amount to wei (smallest unit of Ethereum)
        const parsedAmount = ethers.utils.parseEther(amount);

        // Send the actual ETH transaction through MetaMask
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,          // Sender address
            to: addressTo,                 // Recipient address
            gas: "0x5208",                // Gas limit (21000 in hex)
            value: parsedAmount._hex,     // Amount in wei (hex format)
          }],
        });

        // Record transaction details in our smart contract
        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        // Show loading state while transaction is being mined
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        
        // Wait for transaction to be mined and confirmed
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        // Update transaction count
        const transactionsCount = await transactionsContract.getTransactionCount();
        setTransactionCount(transactionsCount.toNumber());
        
        // Reload page to show updated transaction list
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
