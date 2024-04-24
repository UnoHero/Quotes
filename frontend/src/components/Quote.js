import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useRandom } from "../hooks/useRandom"

const Container = styled.div`
  
`;

const QuoteContainer = styled.div`

`;

const QuoteTitle = styled.h2`

`;

const Quote = () => {
  const {quote, error, isLoading} = useRandom()

  useEffect(() => {
    quote()
  }, []);

  return ( 
    <Container>
      <QuoteContainer>
        <QuoteTitle>A Random Quote</QuoteTitle>
        <ul>
          {quotesReducer.map((quote) => (
            <li key={quote._id}>
              <h3>{quote.body}</h3>
              <p>Author: {quote.author}</p>
            </li>
          ))}
        </ul>
      </QuoteContainer>
    </Container>
  );
}
 
export default Quote;