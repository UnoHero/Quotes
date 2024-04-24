import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";


export const useDelete = () => {
  const { user } = useAuthContext();
  const [delError, setError] = useState(null)
  const [delIsLoading, setIsLoading] = useState(null)

  const del = async (quoteId) => {
    setIsLoading(true)
    setError(null)


      const response = await fetch (`http://127.0.0.1:6001/api/quotes/${quoteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete quote.")
      }

      if (response.ok) {
        setIsLoading(false)
      }
  };

  return { del, delIsLoading, delError};
}
 
