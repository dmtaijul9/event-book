import React, { useContext, useState } from "react";
import axios from "axios";
import "./Auth.css";
import authContext from "../context/auth-context";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const authContextData = useContext(authContext);
  console.log(authContextData);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    console.log(email, password);

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `,
    };

    if (!isLoginMode) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `,
      };
    }

    try {
      const { data } = await axios({
        url: "http://localhost:3000/graphql",
        method: "POST",
        data: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data?.data.login) {
        authContextData.login(
          data?.data.login.userId,
          data?.data.login.token,
          data?.data.login.tokenExpiration
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeLoginMode = (e) => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="form-action">
        <button type="button" onClick={changeLoginMode}>
          Switch to {isLoginMode ? "signup" : "login"}
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Auth;
