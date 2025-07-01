// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

/**
 * @title Transactions
 * @dev Smart contract for handling Ethereum transactions with additional metadata
 * This contract allows users to send transactions with custom messages and keywords,
 * storing all transaction data on the blockchain for permanent record keeping
 */
contract Transactions {
    // Counter to keep track of total number of transactions processed
    uint256 transactionCount;

    /**
     * @dev Event emitted when a new transaction is processed
     * @param from Address of the sender
     * @param receiver Address of the recipient
     * @param amount Amount of ETH transferred (in wei)
     * @param message Custom message attached to the transaction
     * @param timestamp Unix timestamp when the transaction was processed
     * @param keyword Keyword used for GIF association in the frontend
     */
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
  
    /**
     * @dev Struct to store transaction details
     * Contains all relevant information about each transaction for future retrieval
     */
    struct TransferStruct {
        address sender;      // Address of the transaction sender
        address receiver;    // Address of the transaction recipient
        uint amount;         // Amount transferred in wei
        string message;      // Custom message from sender
        uint256 timestamp;   // Block timestamp when transaction was recorded
        string keyword;      // Keyword for GIF association
    }

    // Array to store all processed transactions
    TransferStruct[] transactions;

    /**
     * @dev Process a new transaction and store it on the blockchain
     * @param receiver Address to receive the funds (must be payable)
     * @param amount Amount of ETH to transfer in wei
     * @param message Custom message to attach to the transaction
     * @param keyword Keyword for GIF association in the frontend
     * 
     * This function increments the transaction counter, stores the transaction data,
     * and emits a Transfer event for off-chain monitoring
     */
    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        // Increment the global transaction counter
        transactionCount += 1;
        
        // Store the transaction data in the blockchain
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        // Emit event for off-chain applications to monitor
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    /**
     * @dev Retrieve all stored transactions
     * @return Array of all TransferStruct containing transaction history
     * 
     * This is a view function that doesn't modify state and can be called without gas cost
     * Returns the complete transaction history stored in this contract
     */
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    /**
     * @dev Get the total number of transactions processed
     * @return Current transaction count as uint256
     * 
     * Useful for tracking contract usage and displaying statistics
     */
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}