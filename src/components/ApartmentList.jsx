import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteApartments } from "../features/apartmentsSlice";
import { useNavigate } from "react-router-dom";

const ApartmentList = () => {
  const {
    apartments: { apartments },
    users: { currentUser },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div className="fs-2"> Apartments</div>
        <div
          className="btn btn-outline-success py-1"
          style={{ backgroundColor: "#1abc94", border: "none" }}
          onClick={() => navigate("/apartments/form")}
        >
          Add Apartments
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
              <th scope="col">Apartment Price</th>
              <th scope="col">Apartment Owner</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {apartments?.map((home, i) => (
              <tr key={home?.id}>
                <th scope="row">{i + 1}</th>
                <td>{home?.title}</td>
                <td>{home?.price}</td>
                <td>{home?.owner}</td>
                <td>
                  {currentUser?.fullname === home?.owner ? (
                    <>
                      <i
                        className="fa-solid fa-marker"
                        style={{ color: "#1abc94", cursor: "pointer" }}
                        onClick={() =>
                          navigate("/apartments/form", { state: home })
                        }
                      ></i>
                      <i
                        className="fa-solid fa-trash px-3"
                        style={{ color: "#1abc94", cursor: "pointer" }}
                        onClick={() => dispatch(deleteApartments(home.id))}
                      ></i>
                      <i
                        className="fa-solid fa-calendar-plus"
                        style={{ color: "#525554", cursor: "no-drop" }}
                      ></i>
                    </>
                  ) : (
                    <>
                      <i
                        className="fa-solid fa-marker "
                        style={{ color: "#525554", cursor: "no-drop" }}
                      ></i>
                      <i
                        className="fa-solid fa-trash px-3"
                        style={{ color: "#525554", cursor: "no-drop" }}
                      ></i>
                      <i
                        className="fa-solid fa-calendar-plus"
                        style={{ color: "#1abc94", cursor: "pointer" }}
                        onClick={() =>
                          navigate("/visits/form", { state: home })
                        }
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

export default ApartmentList;
