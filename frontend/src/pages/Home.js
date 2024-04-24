import React, { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext";
import styled from "styled-components";

// pages and components
import Header from "../components/Header"


const Container = styled.div `
  margin-top: 20%;
  text-align: center;
`;

const Home = () => {
  const [quote, setQuote] = useState()
  const { user } = useAuthContext()

    const fetchPost = async () => {
      const response = await fetch('http://127.0.0.1:6001/api/quotes/random')
      const json = await response.json()
      setQuote(json)
    }

    useEffect (() => {
      fetchPost()
    }, [])

  return (
    <div className="home">
      <div className="posts">
        <Header />
        <Container>
          <h2>{quote?.body}</h2>
          <h4>{quote?.author}</h4>
        </Container>
      </div>
    </div>
  )
}

export default Home;