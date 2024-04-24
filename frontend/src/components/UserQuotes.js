import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDelete } from "../hooks/useDelete"
import { useUpdate } from "../hooks/useUpdate"

const Wrapper = styled.div`
  margin-top: 2.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  column-gap: 1.5rem;
  padding-bottom: 20px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 0.5rem;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const TextField = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const Quote = styled.p`
  padding-top: 15px;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const Author = styled.p`
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 1rem;
`;

const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  float: center;
  button {
    margin: 0 0.5rem;
  }
`;

const UserQuotes = ({username, loggedInUser, quotes, fetchQuotes}) => {
  const { user } = useAuthContext();
  const [ newQuote, setNewQuote ] = useState("");
  const [ newEditedQuote, setNewEditedQuote] = useState("");
  const {del, delError, delIsLoading} = useDelete();
  const {update, updateError, updateIsLoading} = useUpdate();
  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    console.log(quotes);
  })

  
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
                {quote.createdAt !== quote.updatedAt && <span style={{ color: 'red' }}>Edited</span>}
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