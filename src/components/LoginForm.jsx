import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
} from "../features/usersSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const LoginForm = () => {
  const { currentUser } = useSelector((state) => state.users);
  const initialState = { fullname: "", email: "", id: nanoid() };
  const [loginState, setLoginState] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeFunc = (e) => {
    const { name, value } = e.target;
    setLoginState({ ...loginState, [name]: value });
  };

  const loginFunc = (e) => {
    e.preventDefault();
    dispatch(fetchStart());
    if (!currentUser?.id) {
      try {
        dispatch(loginSuccess(loginState));
        navigate("/home");
      } catch (error) {
        dispatch(fetchFail());
      }
    } else {
      try {
        dispatch(logoutSuccess());
      } catch (error) {
        dispatch(fetchFail());
      }
    }
    setLoginState(initialState);
  };

  return (
    <form
      className="container"
      onSubmit={loginFunc}
    >
      <div className="input-container">
        <div className="input-content">
          <div className="input-dist">
            <div className="input-type">
              <label htmlFor="fullname" className="input-is">
                Full Name
              </label>
              <input
                type="text"
                className="input-is"
                id="fullname"
                required
                name="fullname"
                value={loginState?.fullname || ""}
                onChange={(e) => changeFunc(e)}
              />
              <label htmlFor="email" className="input-is">
                Email
              </label>
              <input
                type="email"
                className="input-is"
                id="email"
                required
                name="email"
                value={loginState?.email || ""}
                onChange={(e) => changeFunc(e)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        {!currentUser?.id ? (
          <button type="submit" className="btn">
            Login
            <div className="arrow-wrapper">
              <div className="arrow"></div>

            </div>
          </button>
        ) : (
          <button type="submit" className="btn">
            Logout
            <div className="arrow-wrapper">
              <div className="arrow"></div>

            </div>
          </button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
