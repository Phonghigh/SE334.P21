/**
 * Check wallet balance script
 * Verifies if wallet has enough ETH for deployment
 */

require('dotenv').config();
const hre = require("hardhat");

async function main() {
  console.log("🔍 Checking wallet balance...");
  
  if (!process.env.PRIVATE_KEY) {
    console.log("❌ PRIVATE_KEY not found in .env file");
    return;
  }

  try {
    // Get wallet from private key
    const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY);
    const address = wallet.address;
    
    console.log("📍 Wallet Address:", address);
    
    // Connect to provider
    const provider = new hre.ethers.providers.JsonRpcProvider(
      `https://eth-sepolia.g.alchemy.com/v2/1WUCtpwTRj--vRB1PPlFdRveqA7l9XTU`
    );
    
    // Get balance
    const balance = await provider.getBalance(address);
    const balanceInEth = hre.ethers.utils.formatEther(balance);
    
    console.log("💰 Balance:", balanceInEth, "ETH");
    console.log("💰 Balance (Wei):", balance.toString());
    
    // Check if sufficient for deployment (estimate ~0.002 ETH needed)
    const minRequired = hre.ethers.utils.parseEther("0.002");
    
    if (balance.gte(minRequired)) {
      console.log("✅ Sufficient balance for deployment!");
    } else {
      console.log("❌ Insufficient balance!");
      console.log("🎯 Need at least 0.002 ETH for deployment");
      console.log("🌐 Get free Sepolia ETH from:");
      console.log("   - https://sepoliafaucet.com/");
      console.log("   - https://faucets.chain.link/sepolia");
    }
    
  } catch (error) {
    console.error("❌ Error checking balance:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 