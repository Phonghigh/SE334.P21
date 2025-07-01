/**
 * Local deployment script for testing
 * Deploys contract on Hardhat local network with fake ETH
 * No real ETH required!
 */

const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting local deployment...");
  
  // Get the contract factory
  const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
  
  // Deploy the contract (uses fake ETH on local network)
  console.log("📦 Deploying contract...");
  const transactionsContract = await transactionsFactory.deploy();

  // Wait for deployment
  await transactionsContract.deployed();

  console.log("✅ Contract deployed successfully!");
  console.log("📍 Contract address:", transactionsContract.address);
  console.log("🌐 Network: Hardhat Local Network");
  console.log("💰 Cost: FREE (using fake ETH)");
  
  // Test some contract functions
  console.log("\n🧪 Testing contract functions...");
  
  // Test getTransactionCount
  const initialCount = await transactionsContract.getTransactionCount();
  console.log("📊 Initial transaction count:", initialCount.toString());
  
  // Test addToBlockchain
  const [owner, addr1] = await hre.ethers.getSigners();
  console.log("👤 Owner address:", owner.address);
  console.log("👤 Test address:", addr1.address);
  
  // Add a test transaction
  console.log("➕ Adding test transaction...");
  const tx = await transactionsContract.addToBlockchain(
    addr1.address,
    hre.ethers.utils.parseEther("0.1"),
    "Test message from local deployment",
    "celebration"
  );
  
  await tx.wait();
  console.log("✅ Test transaction added!");
  
  // Check transaction count after
  const newCount = await transactionsContract.getTransactionCount();
  console.log("📊 New transaction count:", newCount.toString());
  
  // Get all transactions
  const transactions = await transactionsContract.getAllTransactions();
  console.log("📋 Total transactions stored:", transactions.length);
  
  if (transactions.length > 0) {
    const lastTx = transactions[transactions.length - 1];
    console.log("📄 Last transaction details:");
    console.log("   From:", lastTx.sender);
    console.log("   To:", lastTx.receiver);
    console.log("   Amount:", hre.ethers.utils.formatEther(lastTx.amount), "ETH");
    console.log("   Message:", lastTx.message);
    console.log("   Keyword:", lastTx.keyword);
  }
  
  console.log("\n🎉 Local testing completed successfully!");
  console.log("💡 Contract is working perfectly with fake ETH!");
}

main()
  .then(() => {
    console.log("\n✅ Local deployment and testing finished!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  }); 