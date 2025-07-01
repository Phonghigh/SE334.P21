/**
 * Comprehensive unit tests for Transactions smart contract
 * Tests all contract functionality without spending real ETH
 */

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transactions Contract", function () {
  let transactionsContract;
  let owner;
  let addr1;
  let addr2;

  // Deploy contract before each test
  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const TransactionsFactory = await ethers.getContractFactory("Transactions");
    transactionsContract = await TransactionsFactory.deploy();
    await transactionsContract.deployed();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(transactionsContract.address).to.not.equal(0);
      expect(transactionsContract.address).to.not.equal("");
      expect(transactionsContract.address).to.not.equal(null);
      expect(transactionsContract.address).to.not.equal(undefined);
    });

    it("Should have initial transaction count of 0", async function () {
      const count = await transactionsContract.getTransactionCount();
      expect(count).to.equal(0);
    });

    it("Should have empty transactions array initially", async function () {
      const transactions = await transactionsContract.getAllTransactions();
      expect(transactions.length).to.equal(0);
    });
  });

  describe("Adding Transactions", function () {
    it("Should add a transaction successfully", async function () {
      const receiver = addr1.address;
      const amount = ethers.utils.parseEther("1.0");
      const message = "Test transaction";
      const keyword = "test";

      await transactionsContract.addToBlockchain(receiver, amount, message, keyword);

      const count = await transactionsContract.getTransactionCount();
      expect(count).to.equal(1);
    });

    it("Should emit Transfer event when adding transaction", async function () {
      const receiver = addr1.address;
      const amount = ethers.utils.parseEther("0.5");
      const message = "Event test";
      const keyword = "event";

      await expect(
        transactionsContract.addToBlockchain(receiver, amount, message, keyword)
      ).to.emit(transactionsContract, "Transfer");
    });

    it("Should store transaction data correctly", async function () {
      const receiver = addr1.address;
      const amount = ethers.utils.parseEther("2.0");
      const message = "Storage test";
      const keyword = "storage";

      await transactionsContract.addToBlockchain(receiver, amount, message, keyword);

      const transactions = await transactionsContract.getAllTransactions();
      const transaction = transactions[0];

      expect(transaction.sender).to.equal(owner.address);
      expect(transaction.receiver).to.equal(receiver);
      expect(transaction.amount).to.equal(amount);
      expect(transaction.message).to.equal(message);
      expect(transaction.keyword).to.equal(keyword);
      expect(transaction.timestamp).to.be.above(0);
    });

    it("Should increment transaction count for each transaction", async function () {
      await transactionsContract.addToBlockchain(addr1.address, ethers.utils.parseEther("1"), "Msg1", "key1");
      expect(await transactionsContract.getTransactionCount()).to.equal(1);

      await transactionsContract.addToBlockchain(addr2.address, ethers.utils.parseEther("2"), "Msg2", "key2");
      expect(await transactionsContract.getTransactionCount()).to.equal(2);

      await transactionsContract.addToBlockchain(addr1.address, ethers.utils.parseEther("3"), "Msg3", "key3");
      expect(await transactionsContract.getTransactionCount()).to.equal(3);
    });
  });

  describe("Multiple Transactions", function () {
    it("Should handle multiple transactions correctly", async function () {
      // Add multiple transactions
      const transactions = [
        { to: addr1.address, amount: "1.0", msg: "First", key: "first" },
        { to: addr2.address, amount: "2.5", msg: "Second", key: "second" },
        { to: addr1.address, amount: "0.5", msg: "Third", key: "third" }
      ];

      for (let tx of transactions) {
        await transactionsContract.addToBlockchain(
          tx.to,
          ethers.utils.parseEther(tx.amount),
          tx.msg,
          tx.key
        );
      }

      // Verify count
      const count = await transactionsContract.getTransactionCount();
      expect(count).to.equal(3);

      // Verify all transactions stored
      const allTx = await transactionsContract.getAllTransactions();
      expect(allTx.length).to.equal(3);

      // Verify transaction details
      for (let i = 0; i < transactions.length; i++) {
        expect(allTx[i].receiver).to.equal(transactions[i].to);
        expect(ethers.utils.formatEther(allTx[i].amount)).to.equal(transactions[i].amount);
        expect(allTx[i].message).to.equal(transactions[i].msg);
        expect(allTx[i].keyword).to.equal(transactions[i].key);
      }
    });
  });

  describe("Edge Cases", function () {
    it("Should handle zero amount transactions", async function () {
      await transactionsContract.addToBlockchain(
        addr1.address,
        ethers.utils.parseEther("0"),
        "Zero amount",
        "zero"
      );

      const transactions = await transactionsContract.getAllTransactions();
      expect(transactions[0].amount).to.equal(0);
    });

    it("Should handle empty message and keyword", async function () {
      await transactionsContract.addToBlockchain(
        addr1.address,
        ethers.utils.parseEther("1"),
        "",
        ""
      );

      const transactions = await transactionsContract.getAllTransactions();
      expect(transactions[0].message).to.equal("");
      expect(transactions[0].keyword).to.equal("");
    });

    it("Should handle very large amounts", async function () {
      const largeAmount = ethers.utils.parseEther("1000000");
      
      await transactionsContract.addToBlockchain(
        addr1.address,
        largeAmount,
        "Large amount",
        "large"
      );

      const transactions = await transactionsContract.getAllTransactions();
      expect(transactions[0].amount).to.equal(largeAmount);
    });
  });
});

// Tests completed - all contract functionality verified! 