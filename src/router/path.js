import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeCreate from "../components/employeeCreate";
import EmployeeDetails from "../components/employeeDetails";
import EmplyoyeeEdit from "../components/emplyoyeeEdit";
import EmployeeDelete from "../components/employeeDelete";
import EmployeeList from "../components/employeeList";
import { ToastContainer } from "react-toastify";
const Path = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<EmployeeList/>}/>
          <Route path="/create" element={<EmployeeCreate/>}/>
          <Route path="/view/:id" element={<EmployeeDetails/>}/>
          <Route path="/edit/:id" element={<EmplyoyeeEdit/>}/>
          <Route path="/delete/:id" element={<EmployeeDelete/>}/>
        </Routes>
        <ToastContainer limit={2}/>

      </Router>
    </div>
  );
};

export default Path;
