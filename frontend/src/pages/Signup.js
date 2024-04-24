import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import styled from "styled-components";


const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 80%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

const LinkButton = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  text-decoration: none;
  color: #007bff;
`;

const Signup = () => {
  const [password, setPassword] = useState("")
  const [userName, setUserName] = useState("")
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(userName, password)
  }
  return (
    <PageWrapper>
      <ContentWrapper>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <Title>Sign Up</Title>

            <Label>User Name:</Label>
            <Input 
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />

            <Label>Password</Label>
            <Input 
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <Button disabled={isLoading}>Sign up</Button>
            {error && <ErrorMsg>{error}</ErrorMsg>}
          </Form>
          <LinkButton to="/login" disabled={isLoading}>Log in</LinkButton>
        </FormWrapper>
      </ContentWrapper>
    </PageWrapper>
  )
}

export default Signup;