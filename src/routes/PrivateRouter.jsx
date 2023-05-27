import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = () => {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <div>{currentUser?.fullname ? <Navigate to="/home" /> : <Outlet />}</div>
  );
};

export default PrivateRouter;
