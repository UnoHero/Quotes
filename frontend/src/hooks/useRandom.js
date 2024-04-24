import { useState } from "react"

export const useRandom = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)


  const quote = async () => {
    setIsLoading(true)
    setError(null)

    const response = await fetch("http://127.0.0.1:6001/api/quotes/random");
    const json = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch random quote")
    }

    if (response.ok) {
      setIsLoading(false)
    }
  };
  


    
  return { quote, isLoading, error}
}
 
