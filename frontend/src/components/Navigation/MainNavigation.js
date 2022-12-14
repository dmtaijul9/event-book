import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";

import AuthContext from "../../context/auth-context";

const MainNavigation = () => {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>EasyEvent</h1>
          </div>
          <nav className="main-navigation__items">
            <ul>
              {!context.userId && (
                <li>
                  <NavLink to="/auth">Authenticate</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              {context.userId && (
                <>
                  <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                  </li>
                  <li>
                    <button type="button" onClick={context.logout}>
                      {" "}
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>
      )}
    </AuthContext.Consumer>
  );
};

export default MainNavigation;
