/**
 * Compile-only script for testing contract compilation
 * This script only compiles the contract without deploying
 * Useful for testing without needing private key setup
 */

const hre = require("hardhat");

async function main() {
  console.log("🔨 Compiling contracts...");
  
  // This will compile all contracts in the contracts directory
  await hre.run('compile');
  
  console.log("✅ Contracts compiled successfully!");
  console.log("📁 Compiled artifacts saved to: ./artifacts");
  console.log("📁 Contract ABIs available in: ./artifacts/contracts");
  
  // Get contract factory to verify compilation worked
  const TransactionsFactory = await hre.ethers.getContractFactory("Transactions");
  console.log("🏭 Contract factory created successfully");
  console.log("📋 Contract ready for deployment");
}

main()
  .then(() => {
    console.log("🎉 Compilation test completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Compilation failed:", error);
    process.exit(1);
  }); 