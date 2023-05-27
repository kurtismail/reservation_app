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
        <div className="fs-2"> Visits</div>
        <div
          className="btn btn-outline-success py-1"
          style={{ backgroundColor: "#1abc94", border: "none" }}
          onClick={() => navigate("/visits/form")}
        >
          Add Visit
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
                  {currentUser?.fullname == vis?.visitedPerson ? (
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
