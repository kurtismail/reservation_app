import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addVisit,
  editVisit,
  fetchFail,
  fetchStart,
} from "../features/visitSlice";
import moment from "moment";
import { nanoid } from "@reduxjs/toolkit";
import { useLocation, useNavigate } from "react-router-dom";

const VisitForm = () => {
  const [visitHome, setVisitHome] = useState();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    users: { currentUser },
    apartments: { apartments },
    visit: { visit },
  } = useSelector((state) => state);

  useEffect(() => {
    if (state?.title) {
      setVisitHome({
        id: nanoid(),
        visitedDate: "",
        note: "",
        createdAt: moment().format("LLL"),
        apartment: state?.title,
        visitedPerson: currentUser?.fullname,
      });
    } else if (state) {
      setVisitHome(state);
    } else {
      setVisitHome(initialState);
    }
  }, []);

  const initialState = {
    id: nanoid(),
    visitedDate: "",
    note: "",
    createdAt: moment().format("LLL"),
    apartment: "",
    visitedPerson: currentUser?.fullname,
  };
  const changeFunc = (e) => {
    const { name, value } = e.target;
    setVisitHome({ ...visitHome, [name]: value });
  };
  console.log("visitHome", visitHome);

  const visitAddFunc = (e) => {
    e.preventDefault();
    dispatch(fetchStart());
    try {
      dispatch(addVisit(visitHome));
      navigate("/visits");
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const visitUpdateFunc = (e) => {
    e.preventDefault();
    dispatch(fetchStart());
    try {
      const filterData = visit.filter((vis) => vis.id !== visitHome.id);
      const location = visit.find((vis) => vis.id == visitHome.id);

      filterData.splice(visit.indexOf(location), 0, visitHome);

      dispatch(editVisit([...filterData]));
      setVisitHome(initialState);
      navigate("/visits");
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  return (
    <div className="d-flex container justify-content-center align-items-center my-5">
      <form
        className="p-5 bg-light"
        style={{
          borderTopLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
        onSubmit={state ? visitUpdateFunc : visitAddFunc}
      >
        <div className="mb-3">
          <label htmlFor="apartment" className="form-label">
            Home Name
          </label>
          <select
            className="form-select"
            name="apartment"
            onChange={(e) => changeFunc(e)}
            aria-label="Default select example"
          >
            {!state && (
              <option selected defaultValue="Select Visited Home" disabled>
                Select Visited Home
              </option>
            )}

            {apartments?.map((ap, i) =>
              ap?.title == visitHome?.apartment ? (
                <option key={i} defaultValue={ap.title} selected>
                  {ap.title}
                </option>
              ) : ap?.title == visitHome?.title ? (
                <option key={i} defaultValue={ap.title} selected>
                  {ap.title}
                </option>
              ) : (
                <option key={i} defaultValue={ap.title}>
                  {ap.title}
                </option>
              )
            )}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="note" className="form-label">
            Note
          </label>
          <input
            type="text"
            className="form-control"
            id="note"
            name="note"
            value={visitHome?.note || ""}
            onChange={(e) => changeFunc(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="visitedDate" className="form-label">
            Visit Date
          </label>
          <input
            type="date"
            className="form-control"
            id="visitedDate"
            name="visitedDate"
            value={visitHome?.visitedDate || ""}
            onChange={(e) => changeFunc(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="visitedPerson" className="form-label">
            Visit Person
          </label>
          <input
            type="text"
            readOnly
            className="form-control"
            id="visitedPerson"
            name="visitedPerson"
            value={currentUser?.fullname || ""}
            onChange={(e) => changeFunc(e)}
          />
        </div>
        {state?.title ? (
          <div className="text-center">
            <button
              className="btn btn-outline-success"
              type="submit"
              style={{ backgroundColor: "#1abc94", border: "none" }}
            >
              Add Visit
            </button>
          </div>
        ) : state ? (
          <div className="text-center">
            <button
              className="btn btn-outline-success"
              type="submit"
              style={{ backgroundColor: "#1abc94", border: "none" }}
            >
              Update Visit
            </button>
          </div>
        ) : (
          <div className="text-center">
            <button
              className="btn btn-outline-success"
              type="submit"
              style={{ backgroundColor: "#1abc94", border: "none" }}
            >
              Add Visit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default VisitForm;
