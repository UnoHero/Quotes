import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import React, {useEffect, useState} from "react"
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import './index.css';

function App() {
  const { user } = useAuthContext()

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
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
