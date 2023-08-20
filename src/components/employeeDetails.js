import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import succesToast from "./successToast";
import errorToast from "./errorToast";

const EmployeeDetails = () => {
  const [data, setData] = useState();
  const navigate=useNavigate();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetch("http://localhost:8000/Employee/" + id)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        setData(response);
        succesToast('Employee details')
      })
      .catch((err) => {
        console.log(err);
        errorToast('Error!')
      });
  }, [id]);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div>
        <div
            className=" fs_26 fw_500 my-3 ms-3 "
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="d-flex align-items-center">
              <div className="mt me-3">
                <i className="ri-arrow-left-line"></i>
              </div>
              <div className=""> Employee Details</div>
            </div>
          </div>
          <div className="fw_500 card p-5 shadow lg">
            <div className="mb-2">
              <span className="fs_24">Name :</span>{" "}
              <span className="fs_20 text-capitalize">{data?.name}</span>
            </div>
            <div className="mb-2">
              <span className="fs_24"> Email : </span>
              <span className="fs_20 ">{data?.email}</span>
            </div>
            <div>
              <span className="fs_24">Phone :</span>{" "}
              <span className="fs_20 ">{data?.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EmployeeDetails;
