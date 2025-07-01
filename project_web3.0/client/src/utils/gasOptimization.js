import { ethers } from "ethers";

/**
 * Gas Optimization Utilities
 * Provides functions to estimate and optimize gas fees for transactions
 * Includes dynamic gas pricing and fee estimation
 */

/**
 * Get current gas prices from network
 * @param {Object} provider - Ethereum provider
 * @returns {Object} Gas price information
 */
export const getCurrentGasPrices = async (provider) => {
  try {
    const gasPrice = await provider.getGasPrice();
    const block = await provider.getBlock("latest");
    
    // Calculate different gas price levels
    const baseFee = block.baseFeePerGas;
    const priorityFee = gasPrice.sub(baseFee || 0);
    
    return {
      gasPrice: gasPrice,
      baseFee: baseFee || ethers.BigNumber.from(0),
      priorityFee: priorityFee,
      slow: gasPrice.mul(80).div(100), // 20% below current
      standard: gasPrice,
      fast: gasPrice.mul(120).div(100), // 20% above current
      instant: gasPrice.mul(150).div(100) // 50% above current
    };
  } catch (error) {
    console.error("Error getting gas prices:", error);
    // Fallback gas prices (in Gwei)
    return {
      gasPrice: ethers.utils.parseUnits("20", "gwei"),
      baseFee: ethers.utils.parseUnits("15", "gwei"),
      priorityFee: ethers.utils.parseUnits("2", "gwei"),
      slow: ethers.utils.parseUnits("15", "gwei"),
      standard: ethers.utils.parseUnits("20", "gwei"),
      fast: ethers.utils.parseUnits("25", "gwei"),
      instant: ethers.utils.parseUnits("30", "gwei")
    };
  }
};

/**
 * Estimate gas for a transaction
 * @param {Object} contract - Smart contract instance
 * @param {string} method - Contract method name
 * @param {Array} params - Method parameters
 * @param {Object} options - Transaction options (value, from, etc.)
 * @returns {Object} Gas estimation details
 */
export const estimateTransactionGas = async (contract, method, params = [], options = {}) => {
  try {
    // Estimate gas limit
    const gasLimit = await contract.estimateGas[method](...params, options);
    
    // Add 20% buffer to gas limit for safety
    const gasLimitWithBuffer = gasLimit.mul(120).div(100);
    
    // Get current gas prices
    const gasPrices = await getCurrentGasPrices(contract.provider);
    
    // Calculate costs for different speed options
    const costs = {
      slow: {
        gasPrice: gasPrices.slow,
        gasLimit: gasLimitWithBuffer,
        totalCost: gasPrices.slow.mul(gasLimitWithBuffer),
        estimatedTime: "5-10 minutes"
      },
      standard: {
        gasPrice: gasPrices.standard,
        gasLimit: gasLimitWithBuffer,
        totalCost: gasPrices.standard.mul(gasLimitWithBuffer),
        estimatedTime: "2-5 minutes"
      },
      fast: {
        gasPrice: gasPrices.fast,
        gasLimit: gasLimitWithBuffer,
        totalCost: gasPrices.fast.mul(gasLimitWithBuffer),
        estimatedTime: "30 seconds - 2 minutes"
      },
      instant: {
        gasPrice: gasPrices.instant,
        gasLimit: gasLimitWithBuffer,
        totalCost: gasPrices.instant.mul(gasLimitWithBuffer),
        estimatedTime: "15-30 seconds"
      }
    };
    
    return {
      originalGasLimit: gasLimit,
      recommendedGasLimit: gasLimitWithBuffer,
      costs,
      currentNetwork: await contract.provider.getNetwork()
    };
  } catch (error) {
    console.error("Error estimating gas:", error);
    throw new Error(`Gas estimation failed: ${error.message}`);
  }
};

/**
 * Get optimal gas settings based on network conditions
 * @param {Object} provider - Ethereum provider
 * @param {string} priority - Priority level: "low", "medium", "high"
 * @returns {Object} Optimal gas settings
 */
export const getOptimalGasSettings = async (provider, priority = "medium") => {
  try {
    const gasPrices = await getCurrentGasPrices(provider);
    const network = await provider.getNetwork();
    
    // Different strategies for different networks
    let gasSettings;
    
    if (network.chainId === 1) { // Mainnet
      switch (priority) {
        case "low":
          gasSettings = {
            gasPrice: gasPrices.slow,
            maxFeePerGas: gasPrices.baseFee.add(gasPrices.priorityFee.div(2)),
            maxPriorityFeePerGas: gasPrices.priorityFee.div(2)
          };
          break;
        case "high":
          gasSettings = {
            gasPrice: gasPrices.fast,
            maxFeePerGas: gasPrices.baseFee.add(gasPrices.priorityFee.mul(2)),
            maxPriorityFeePerGas: gasPrices.priorityFee.mul(2)
          };
          break;
        default: // medium
          gasSettings = {
            gasPrice: gasPrices.standard,
            maxFeePerGas: gasPrices.baseFee.add(gasPrices.priorityFee),
            maxPriorityFeePerGas: gasPrices.priorityFee
          };
      }
    } else { // Testnets or other networks
      gasSettings = {
        gasPrice: gasPrices.standard,
        gasLimit: 300000 // Higher limit for testnets
      };
    }
    
    return {
      ...gasSettings,
      network: network.name,
      chainId: network.chainId
    };
  } catch (error) {
    console.error("Error getting optimal gas settings:", error);
    // Fallback settings
    return {
      gasPrice: ethers.utils.parseUnits("20", "gwei"),
      gasLimit: 300000
    };
  }
};

/**
 * Format gas price for display
 * @param {BigNumber} gasPrice - Gas price in wei
 * @param {string} unit - Unit to display ("gwei", "eth")
 * @returns {string} Formatted gas price
 */
export const formatGasPrice = (gasPrice, unit = "gwei") => {
  try {
    if (unit === "eth") {
      return ethers.utils.formatEther(gasPrice);
    }
    return ethers.utils.formatUnits(gasPrice, "gwei");
  } catch (error) {
    return "0";
  }
};

/**
 * Calculate transaction cost in USD
 * @param {BigNumber} gasCost - Total gas cost in wei
 * @param {number} ethPriceUSD - Current ETH price in USD
 * @returns {string} Cost in USD
 */
export const calculateTransactionCostUSD = (gasCost, ethPriceUSD) => {
  try {
    const costInEth = parseFloat(ethers.utils.formatEther(gasCost));
    const costInUSD = costInEth * ethPriceUSD;
    return costInUSD.toFixed(2);
  } catch (error) {
    return "0.00";
  }
};

/**
 * Monitor gas prices and suggest optimal timing
 * @param {Object} provider - Ethereum provider
 * @param {Function} callback - Callback function for price updates
 * @returns {Function} Cleanup function to stop monitoring
 */
export const monitorGasPrices = (provider, callback) => {
  let intervalId;
  
  const checkGasPrices = async () => {
    try {
      const gasPrices = await getCurrentGasPrices(provider);
      callback(gasPrices);
    } catch (error) {
      console.error("Error monitoring gas prices:", error);
    }
  };
  
  // Check immediately
  checkGasPrices();
  
  // Check every 30 seconds
  intervalId = setInterval(checkGasPrices, 30000);
  
  // Return cleanup function
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
}; 