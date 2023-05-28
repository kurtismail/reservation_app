import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteVisit } from "../features/visitSlice";
import { useNavigate } from "react-router-dom";

const VisitList = () => {
  const {
    visit: { visit },
    users: { currentUser },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div className="fs-2 m-3"> Visits</div>
        <div
          className="button btn-outline-success py-1"
          style={{ backgroundColor: "#1abc94", border: "none" }}
          onClick={() => navigate("/visits/form")}
        >

          <button type="button" className="button">
            <span className="button__text">Add Visit</span>
            <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
          </button>
        </div>
      </div>

      <div>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">
                <i
                  className="fa-solid fa-house fa-xl"
                  style={{ color: "#1abc94" }}
                ></i>
              </th>
              <th scope="col">Apartment Name</th>
              <th scope="col">Visited Date</th>
              <th scope="col">Visited Note</th>
              <th scope="col">Visited Person</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {visit?.map((vis, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{vis?.apartment}</td>
                <td>{vis?.visitedDate.split("-").reverse().join(".")}</td>
                <td>{vis?.note}</td>
                <td>{vis?.visitedPerson}</td>
                <td>
                  {currentUser?.fullname === vis?.visitedPerson ? (
                    <>
                      <i
                        className="fa-solid fa-marker pe-3"
                        style={{ color: "#1abc94", cursor: "pointer" }}
                        onClick={() => navigate("/visits/form", { state: vis })}
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "#1abc94", cursor: "pointer" }}
                        onClick={() => dispatch(deleteVisit(vis.id))}
                      ></i>
                    </>
                  ) : (
                    <>
                      <i
                        className="fa-solid fa-marker pe-3"
                        style={{ color: "#525554", cursor: "no-drop" }}
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "#525554", cursor: "no-drop" }}
                      ></i>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitList;
