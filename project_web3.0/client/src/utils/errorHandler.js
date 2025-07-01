/**
 * Enhanced Error Handling Utilities
 * Provides comprehensive error handling and user-friendly error messages
 */

export const ERROR_TYPES = {
  WALLET_ERROR: "WALLET_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR", 
  TRANSACTION_ERROR: "TRANSACTION_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR"
};

const ERROR_PATTERNS = {
  "MetaMask is not installed": {
    type: ERROR_TYPES.WALLET_ERROR,
    title: "MetaMask Not Found",
    message: "Please install MetaMask browser extension to use this application."
  },
  
  "User rejected": {
    type: ERROR_TYPES.WALLET_ERROR,
    title: "Transaction Cancelled",
    message: "You cancelled the transaction. Please try again when ready."
  },
  
  "insufficient funds": {
    type: ERROR_TYPES.TRANSACTION_ERROR,
    title: "Insufficient Funds",
    message: "You don't have enough ETH to complete this transaction."
  }
};

export const parseError = (error) => {
  const errorMessage = error?.message || error?.toString() || "Unknown error occurred";
  
  for (const [pattern, errorInfo] of Object.entries(ERROR_PATTERNS)) {
    if (errorMessage.toLowerCase().includes(pattern.toLowerCase())) {
      return {
        ...errorInfo,
        originalError: error,
        timestamp: new Date().toISOString()
      };
    }
  }
  
  return {
    type: ERROR_TYPES.UNKNOWN_ERROR,
    title: "Unknown Error",
    message: errorMessage.length > 100 ? errorMessage.substring(0, 100) + "..." : errorMessage,
    originalError: error,
    timestamp: new Date().toISOString()
  };
};

export const handleError = (error, notifyError) => {
  const parsedError = parseError(error);
  
  console.error("Application Error:", parsedError);
  
  if (notifyError) {
    notifyError(parsedError.message, parsedError.title, 8000);
  }
  
  return parsedError;
}; 