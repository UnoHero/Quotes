import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

// pages and components
import Header from "../components/Header"
import UserQuotes from "../components/UserQuotes"

const Profile = () => {
  const { user } = useAuthContext();
  const { username } = useParams();
  const [ quotes, setQuotes ] = useState ([])


  const fetchQuotes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:6001/api/quotes/")
      if (!response.ok) {
        throw new Error("Failed to fetch quotes");
      }
      const data = await response.json();
      const usersQuotes = data.filter((quote) => quote.author == username)
      setQuotes(usersQuotes);

    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [username])
  
  return (  
  <div>
    <Header />
    <UserQuotes  username={username} loggedInUser={user} quotes={quotes} fetchQuotes={fetchQuotes}/>
  </div>
  );
}
 
export default Profile;