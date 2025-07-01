/**
 * Smart Contract Deployment Script
 * Deploys the Transactions contract to the configured network
 * Handles deployment process and error management
 */

/**
 * Main deployment function
 * Creates contract factory, deploys contract, and logs the address
 */
const main = async () => {
  // Get the contract factory for the Transactions contract
  const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
  
  // Deploy the contract (constructor is called here)
  const transactionsContract = await transactionsFactory.deploy();

  // Wait for the contract to be deployed and mined
  await transactionsContract.deployed();

  // Log the deployed contract address for frontend integration
  console.log("Transactions address: ", transactionsContract.address);
};

/**
 * Main execution wrapper with error handling
 * Runs the deployment and handles success/failure scenarios
 */
const runMain = async () => {
  try {
    // Execute the deployment
    await main();
    
    // Exit successfully
    process.exit(0);
  } catch (error) {
    // Log error and exit with failure code
    console.error(error);
    process.exit(1);
  }
};

// Start deployment process
runMain();