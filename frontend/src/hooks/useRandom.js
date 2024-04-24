import { useState } from "react"

// gets a random quote from the api

export const useRandom = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)


  const randomQuote = async () => {
    setIsLoading(true)
    setError(null)
    
    // fetch the random from the random api
    const response = await fetch("http://127.0.0.1:6001/api/quotes/random");
    const json = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch random quote")
    }

    if (response.ok) {
      setIsLoading(false)
    }
  };
  


    
  return { randomQuote, isLoading, error}
}
 
