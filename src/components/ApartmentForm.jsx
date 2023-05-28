import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addApartments,
  editApartments,
  fetchFail,
  fetchStart,
} from "../features/apartmentsSlice";

const ApartmentForm = () => {
  const [home, setHome] = useState();
  const {
    users: { currentUser },
    apartments: { apartments },
  } = useSelector((state) => state);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("state", state);

  useEffect(() => {
    if (state) {
      setHome(state);
    } else {
      setHome(initialState);
    }
  }, []);

  const initialState = {
    id: nanoid(),
    title: "",
    price: "",
    createdAt: moment().format("LLL"),
    owner: currentUser?.fullname,
  };

  const apartmentAddFunc = (e) => {
    e.preventDefault();
    dispatch(fetchStart());
    try {
      dispatch(addApartments(home));
      setHome(initialState);
      navigate("/apartments");
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const apartmentUpdateFunc = (e) => {
    e.preventDefault();
    dispatch(fetchStart());
    try {
      const filterData = apartments.filter((apart) => apart.id !== home.id);
      const location = apartments.find((apart) => apart.id === home.id);

      filterData.splice(apartments.indexOf(location), 0, home);
      console.log("filter", filterData);

      dispatch(editApartments([...filterData]));
      setHome(initialState);
      navigate("/apartments");
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const changeFunc = (e) => {
    const { name, value } = e.target;
    setHome({ ...home, [name]: value });
  };

  return (
    <div className="d-flex container justify-content-center align-items-center  my-5">
      <form
        className="p-5 bg-light"
        style={{
          borderTopLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
        onSubmit={state ? apartmentUpdateFunc : apartmentAddFunc}
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Home Name
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={home?.title || ""}
            onChange={(e) => changeFunc(e)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={home?.price || ""}
            onChange={(e) => changeFunc(e)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="owner" className="form-label">
            Owner
          </label>
          <input
            type="text"
            className="form-control"
            id="owner"
            name="owner"
            value={home?.owner || ""}
            onChange={(e) => changeFunc(e)}
            required
          />
        </div>
        {state ? (
          <div className="text-center">
            <button
              className="btn btn-outline-success"
              type="submit"
              style={{ backgroundColor: "#1abc94", border: "none" }}
            >
              Update
            </button>
          </div>
        ) : (
          <div className="text-center">
            <button
              className="btn btn-outline-success"
              type="submit"
              style={{ backgroundColor: "#1abc94", border: "none" }}
            >
              Add
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ApartmentForm;
