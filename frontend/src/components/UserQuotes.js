import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDelete } from "../hooks/useDelete"
import { useUpdate } from "../hooks/useUpdate"

const Wrapper = styled.div `
  text-align: center;
  margin-top: 2.5%;
`;

const Quote = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
  max-width: 25%;
`;

const Author = styled.div `
  font-size: 18px;
  color: gray;
`;

const TextField = styled.input `
  width: 40%;
  max-width: 40%;
  max-height: 50%;
  height: 50px;
`;
const TextArea = styled.textarea `
  width: 40%;
  max-width: 40%;
  max-height: 50%;
  height: 50px;
  margin-botton: 10px;
`;

const Button = styled.button `
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;
`;

const ActionButtonsWrapper = styled.div `
  display: flex;
  justefy-content: center;
`;

const UserQuotes = ({username, loggedInUser, quotes, fetchQuotes}) => {
  const { user } = useAuthContext();
  const [ newQuote, setNewQuote ] = useState("");
  const [ newEditedQuote, setNewEditedQuote] = useState("");
  const {del, delError, delIsLoading} = useDelete();
  const {update, updateError, updateIsLoading} = useUpdate();
  const [editingId, setEditingId] = useState("");

  const handleAddQuote = async () => {
    try {
      if (!newQuote.trim()) {
        alert("Please enter a quote.");
        return;
      }
      if (newQuote.length > 100) {
        alert("Quote shoud be maximum 100 characters long.")
        return;
      }

      const response = await fetch("http://127.0.0.1:6001/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }, 
        body: JSON.stringify({
          body:newQuote.trim(),
          author:user.userName
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add quote.");
      }
      fetchQuotes()
      setNewQuote("")
    } catch (error) {
      console.error("Error adding quote:", error);
      alert("Failed to add quote. Please try again later.")
    }
  };

  const handleDelQuote = async (quoteId) => {
    try {
      await del(quoteId)
      await fetchQuotes()
    } catch (error) {
      error.status(401).json(error. error.message)
    }
  }


  const handleEditQuote = async (quoteId) => {
    if (quoteId === editingId) {
      try {
        await update(quoteId, newEditedQuote);
        await fetchQuotes()
        setEditingId(null)
      } catch (error) {
        console.error("Error editing quote:", error);
      }
    } else {
      setEditingId(quoteId);
      const editedQuote = quotes.find((quote) => quote._id === quoteId);
      setNewEditedQuote(editedQuote.body);
    }
  }

  return (  
    <Wrapper>
      {user?.userName === username && (
          <div>
            <TextArea
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              placeholder="Write a new quote (max 100 characters"
              maxLength={100}
              />
              <Button onClick={handleAddQuote}>Add Quote</Button>
          </div>
        )}
        {quotes.map((quote) => (
          <div key={quote._id}>
            {editingId === quote._id ? (
              <TextField
                value={newEditedQuote}
                onChange={(e) => setNewEditedQuote(e.target.value)}
                placeholder="Write a new quote (max 100 characters"
                maxLength={100}
              />
            ) : (
              <>
                <Quote>{quote.body}</Quote>
                <Author>- {quote.author}</Author>
              </>
            )}
            {user?.userName === username && (
              <ActionButtonsWrapper>
                <Button onClick={() => handleDelQuote(quote._id)}>Delete</Button>
                <Button onClick={() => handleEditQuote(quote._id)}>{editingId === quote._id ? "Done" : "Edit"}</Button>
              </ActionButtonsWrapper>
            )}
          </div>
        ))}
    </Wrapper>
  );
};
 
export default UserQuotes;