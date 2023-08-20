import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeDelete from "./employeeDelete";

const EmployeeList = () => {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [selected_id, setSelected_id] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8000/Employee")
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const viewfn = (id) => {
    navigate(`/view/${id}`);
  };
  const editfn = (id) => {
    navigate(`/edit/${id}`);
  };
  const dltfn = (id) => {
    handleShow();
    setSelected_id(id);
  };
  return (
    <div className="container">
      <EmployeeDelete show={show} Hide={handleClose} item_id={selected_id} />

      <div className="d-flex justify-content-end my-4">
        <button
          className="border-0 rounded px-4 py-1 bg-success text-white py-2 fs_18 fw_600"
          onClick={() => navigate("/create")}
        >
          Add Employee +
        </button>
      </div>
      <table className="table table-bordered">
        <thead className="bg-dark text-white">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr>
              <td key={item?.id}>{item?.id}</td>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.phone}</td>
              <td>
                <button
                  className="border-0 bg-primary px-3 py-1 text-white rounded mx-1"
                  onClick={() => viewfn(item?.id)}
                >
                  View
                </button>
                <button
                  className="border-0 bg-success px-3 py-1 text-white rounded mx-1"
                  onClick={() => editfn(item?.id)}
                >
                  Edit
                </button>
                <button
                  className="border-0 bg-danger px-3 py-1 text-white rounded mx-1"
                  onClick={() => dltfn(item?.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
