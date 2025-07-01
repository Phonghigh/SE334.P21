/**
 * Utility function to shorten Ethereum addresses for display
 * @param {string} address - Full Ethereum address (42 characters)
 * @returns {string} Shortened address in format "0x123...abcd"
 * 
 * Takes a full Ethereum address and returns a shortened version showing
 * the first 5 characters and last 4 characters, connected with "..."
 * This is commonly used in UI to display addresses in a readable format
 * without taking up too much space
 */
export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
