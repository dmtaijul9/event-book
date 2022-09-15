import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import MainNavigation from "./components/Navigation/MainNavigation";
import Auth from "./pages/Auth";
import Bookings from "./pages/Bookings";
import Events from "./pages/Events";
import AuthContext from "./context/auth-context";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (userId, token, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
  };
  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      <div>
        <MainNavigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/events" element={<Events />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
