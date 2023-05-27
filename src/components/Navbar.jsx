import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchFail, fetchStart, logoutSuccess } from "../features/usersSlice";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutFunc = () => {
    dispatch(fetchStart());
    try {
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-black text-decoration-none">
            Fearless Reservation
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {currentUser?.fullname && (
            <div
              className="collapse navbar-collapse lg-d-flex justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/apartments" className="nav-link">
                    Apartments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/visits" className="nav-link">
                    Visit
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <i
                      className="fa-solid fa-right-from-bracket"
                      style={{ cursor: "pointer" }}
                      onClick={logoutFunc}
                    ></i>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
