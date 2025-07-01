import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineFilter, AiOutlineClose } from "react-icons/ai";
import { BiCalendar, BiWallet } from "react-icons/bi";

/**
 * Transaction Filter Component
 * Provides filtering and searching capabilities for transaction history
 * Supports filtering by amount range, date range, address, and keyword search
 */

const TransactionFilter = ({ transactions, onFilteredTransactions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    minAmount: "",
    maxAmount: "",
    dateFrom: "",
    dateTo: "",
    addressFilter: "",
    sortBy: "newest"
  });

  /**
   * Handle filter input changes
   * @param {Event} e - Input change event
   * @param {string} filterType - Type of filter being changed
   */
  const handleFilterChange = (e, filterType) => {
    const value = e.target.value;
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  /**
   * Apply filters to transactions
   * @param {Object} currentFilters - Current filter state
   */
  const applyFilters = (currentFilters) => {
    let filtered = [...transactions];

    // Search filter (message, keyword, addresses)
    if (currentFilters.search) {
      const searchTerm = currentFilters.search.toLowerCase();
      filtered = filtered.filter(tx =>
        tx.message?.toLowerCase().includes(searchTerm) ||
        tx.keyword?.toLowerCase().includes(searchTerm) ||
        tx.addressTo?.toLowerCase().includes(searchTerm) ||
        tx.addressFrom?.toLowerCase().includes(searchTerm)
      );
    }

    // Amount range filter
    if (currentFilters.minAmount) {
      filtered = filtered.filter(tx => 
        parseFloat(tx.amount) >= parseFloat(currentFilters.minAmount)
      );
    }
    if (currentFilters.maxAmount) {
      filtered = filtered.filter(tx => 
        parseFloat(tx.amount) <= parseFloat(currentFilters.maxAmount)
      );
    }

    // Address filter
    if (currentFilters.addressFilter) {
      const addressTerm = currentFilters.addressFilter.toLowerCase();
      filtered = filtered.filter(tx =>
        tx.addressTo?.toLowerCase().includes(addressTerm) ||
        tx.addressFrom?.toLowerCase().includes(addressTerm)
      );
    }

    // Date range filter
    if (currentFilters.dateFrom || currentFilters.dateTo) {
      filtered = filtered.filter(tx => {
        const txDate = new Date(tx.timestamp);
        const fromDate = currentFilters.dateFrom ? new Date(currentFilters.dateFrom) : null;
        const toDate = currentFilters.dateTo ? new Date(currentFilters.dateTo) : null;

        if (fromDate && txDate < fromDate) return false;
        if (toDate && txDate > toDate) return false;
        return true;
      });
    }

    // Sort transactions
    filtered.sort((a, b) => {
      switch (currentFilters.sortBy) {
        case "newest":
          return new Date(b.timestamp) - new Date(a.timestamp);
        case "oldest":
          return new Date(a.timestamp) - new Date(b.timestamp);
        case "highest":
          return parseFloat(b.amount) - parseFloat(a.amount);
        case "lowest":
          return parseFloat(a.amount) - parseFloat(b.amount);
        default:
          return 0;
      }
    });

    onFilteredTransactions(filtered);
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      minAmount: "",
      maxAmount: "",
      dateFrom: "",
      dateTo: "",
      addressFilter: "",
      sortBy: "newest"
    };
    setFilters(clearedFilters);
    applyFilters(clearedFilters);
  };

  /**
   * Get active filter count
   * @returns {number} Number of active filters
   */
  const getActiveFilterCount = () => {
    return Object.entries(filters).filter(([key, value]) => 
      key !== "sortBy" && value !== ""
    ).length;
  };

  return (
    <div className="mb-6">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <AiOutlineFilter className="w-5 h-5" />
          <span>Filters</span>
          {getActiveFilterCount() > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
              {getActiveFilterCount()}
            </span>
          )}
        </button>

        {/* Quick Search */}
        <div className="relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Quick search..."
            value={filters.search}
            onChange={(e) => handleFilterChange(e, "search")}
            className="pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {filters.search && (
            <button
              onClick={() => handleFilterChange({ target: { value: "" } }, "search")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <AiOutlineClose className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg border border-white border-opacity-20 p-6 space-y-4">
          {/* Amount Range */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Amount Range (ETH)</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Min amount"
                value={filters.minAmount}
                onChange={(e) => handleFilterChange(e, "minAmount")}
                className="px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.001"
              />
              <input
                type="number"
                placeholder="Max amount"
                value={filters.maxAmount}
                onChange={(e) => handleFilterChange(e, "maxAmount")}
                className="px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.001"
              />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Date Range</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <BiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange(e, "dateFrom")}
                  className="pl-10 pr-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div className="relative">
                <BiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange(e, "dateTo")}
                  className="pl-10 pr-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
          </div>

          {/* Address Filter */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Address Filter</label>
            <div className="relative">
              <BiWallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by address..."
                value={filters.addressFilter}
                onChange={(e) => handleFilterChange(e, "addressFilter")}
                className="pl-10 pr-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange(e, "sortBy")}
              className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest" className="bg-gray-800">Newest First</option>
              <option value="oldest" className="bg-gray-800">Oldest First</option>
              <option value="highest" className="bg-gray-800">Highest Amount</option>
              <option value="lowest" className="bg-gray-800">Lowest Amount</option>
            </select>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (key === "sortBy" || !value) return null;
            
            const filterLabels = {
              search: "Search",
              minAmount: "Min Amount",
              maxAmount: "Max Amount", 
              dateFrom: "From Date",
              dateTo: "To Date",
              addressFilter: "Address"
            };

            return (
              <span
                key={key}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
              >
                <span>{filterLabels[key]}: {value}</span>
                <button
                  onClick={() => handleFilterChange({ target: { value: "" } }, key)}
                  className="ml-1 hover:bg-blue-700 rounded-full p-0.5"
                >
                  <AiOutlineClose className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TransactionFilter; 