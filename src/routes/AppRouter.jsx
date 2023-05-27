import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Apartments from "../components/ApartmentList";
import Navbar from "../components/Navbar";
import Visit from "../pages/Visit";
import PrivateRouter from "./PrivateRouter";
import ApartmentForm from "../components/ApartmentForm";
import VisitForm from "../components/VisitForm";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRouter />}>
          <Route path="" element={<Login />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/apartments/form" element={<ApartmentForm />} />
        <Route path="/visits" element={<Visit />} />
        <Route path="/visits/form" element={<VisitForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
