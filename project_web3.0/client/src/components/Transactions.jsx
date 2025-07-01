import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

/**
 * Individual Transaction Card Component
 * Displays transaction details with enhanced styling and animations
 */
const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  const gifUrl = useFetch({ keyword });
  
  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base hover:text-blue-400 transition-colors">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base hover:text-blue-400 transition-colors">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        
        <img
          src={gifUrl || url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Main Transactions Component
 */
const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <div>
            <h3 className="text-white text-3xl text-center my-2">
              Latest Transactions
            </h3>
            
            <div className="text-center mb-4">
              <p className="text-white opacity-75">
                Showing {[...dummyData, ...transactions].length} transactions
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center mt-10">
              {[...dummyData, ...transactions].reverse().map((transaction, i) => (
                <TransactionsCard key={i} {...transaction} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-white text-3xl text-center my-2">
              Connect your account to see the latest transactions
            </h3>
            <p className="text-white opacity-75 mt-4">
              Please connect your MetaMask wallet to view transaction history
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
