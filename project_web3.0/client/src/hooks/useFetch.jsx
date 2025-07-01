import { useEffect, useState } from "react";

// Get Giphy API key from environment variables
const APIKEY = import.meta.env.VITE_GIPHY_API;

/**
 * Custom React Hook for fetching GIFs from Giphy API
 * @param {Object} params - Hook parameters
 * @param {string} params.keyword - Search keyword for GIF lookup
 * @returns {string} URL of the fetched GIF or fallback GIF URL
 * 
 * This hook fetches a GIF based on the provided keyword and returns the URL.
 * If the API call fails or no keyword is provided, it returns a fallback GIF.
 */
const useFetch = ({ keyword }) => {
  // State to store the GIF URL
  const [gifUrl, setGifUrl] = useState("");

  /**
   * Fetch GIF from Giphy API based on keyword
   * Uses the first result from the search and gets medium-sized version
   */
  const fetchGifs = async () => {
    try {
      // Call Giphy API with search keyword (remove spaces for better results)
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);
      const { data } = await response.json();

      // Set the URL from the first result's medium-sized image
      setGifUrl(data[0]?.images?.downsized_medium.url);
    } catch (error) {
      // Fallback to a default GIF if API call fails
      setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
    }
  };

  // Effect to fetch GIF when keyword changes
  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gifUrl;
};

export default useFetch;
