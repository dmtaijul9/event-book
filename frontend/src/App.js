import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import MainNavigation from "./components/Navigation/MainNavigation";
import Auth from "./pages/Auth";
import Bookings from "./pages/Bookings";
import Events from "./pages/Events";

function App() {
  return (
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
  );
}

export default App;
