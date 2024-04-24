import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";

export const useUpdate = () => {
  const { user } = useAuthContext();
  const [updateError, setError] = useState(null)
  const [updateIsLoading, setIsLoading] = useState(null)

  const update = async (quoteId, newQuote) => {
    setIsLoading(true)
    setError(null)

    console.log(newQuote);

      const response = await fetch (`http://127.0.0.1:6001/api/quotes/${quoteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({newQuote})

      });

      if (!response.ok) {
        throw new Error("Failed to delete quote.")
      }

      if (response.ok) {
        setIsLoading(false)
      }
  };

  return { update, updateIsLoading, updateError};
}
 
