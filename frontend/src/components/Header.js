import styled from "styled-components";
import { Link, useLocation, useParams } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const HeaderContainer = styled.header`
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;W
`;

const Logo = styled.img`
  height: 50px;
  object-fit: contain;
`;

const HeadLine = styled.h1`
  color: white;
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Buttons = styled.button`
  margin-left: 10px;
  font-size: 1rem;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #ccc;
    color: black;
  }
`;

const LinkButtons = styled(Link)`
  margin-left: 10px;
  font-size: 1rem;
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #ccc;
    color: black;
  }
`;

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { username } = useParams();

  const handleClick = () => {
    logout();
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src="/logo.png" alt="Logo" />
      </Link>
      <HeadLine>
        Quotes {username && <span> by {username}</span>}
      </HeadLine>
      <ButtonsContainer>
        {user ? (
          <>
            <LinkButtons to={`/home/${user?.userName}`}>Profile</LinkButtons>
            <Buttons onClick={handleClick}>Log Out</Buttons>
          </>
        ) : (
          <>
            <LinkButtons to="/login">Login</LinkButtons>
            <LinkButtons to="/signup">Signup</LinkButtons>
          </>
        )}
      </ButtonsContainer>
    </HeaderContainer>
  );
};

export default Header;