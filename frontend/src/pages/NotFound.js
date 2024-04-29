import React, { useState, useEffect } from "react"
import styled from "styled-components";


// pages and components
import Header from "../components/Header"

const Container = styled.div `
  margin-top: 20%;
  text-align: center;
`;

const NotFound = () => {
  return (
<div className="home">
      <div className="posts">
        <Header />
        <Container>
          <h2>
            404 not found
          </h2>
        </Container>
      </div>
    </div>
  );
}
 
export default NotFound;