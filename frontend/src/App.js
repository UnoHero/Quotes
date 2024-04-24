import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import React, {useEffect, useState} from "react"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

import './index.css';

function App() {
  const [ user, setUser ] = useState()

  useEffect (() => {
    getUser();
  }, [])

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    setUser(user)
    console.log(user);
  }



  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/home/:username"
              element={user ? <Profile /> : <Navigate to={`/`} />}
            />
            <Route
              path="/:username"
              element={<Profile />}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
