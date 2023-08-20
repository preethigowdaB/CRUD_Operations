import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import succesToast from "./successToast";
import errorToast from "./errorToast";

const EmployeeEdit = () => {
  const [employee, setEmployee] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:8000/Employee/${id}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setEmployee(response);
        setName(response?.name || "");
        setEmail(response?.email);
        setPhone(response?.phone);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSave = () => {
    fetch(`http://localhost:8000/Employee/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...employee, name, email, phone }),
    })
        .then((res) => res.json() ,
        navigate("/")
        )
      .then((response) => {
        console.log(response);
        succesToast('Edited Successfully')
      })
      .catch((err) => {
        console.log(err);
        errorToast("Error!")
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form>
          <div>
            <div>
              <label className="fs_18 fw_500 mb-1">Name</label>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" px-3 py-1  w-100 rounded"
            />
          </div>
          <div>
            <div>
              <label className="fs_18 fw_500 mb-1">Email</label>
            </div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className=" px-3 py-1  w-100 rounded"
              value={email}
            />
          </div>
          <div>
            <div>
              <label className="fs_18 fw_500 mb-1">Phone</label>
            </div>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              className=" px-3 py-1  w-100 rounded"
              value={phone}
            />
          </div>
          <button
            type="submit"
            className=" bg-success text-light  border-0 px-4 py-1 rounded-1 my-3"
            onClick={handleSave}
          >
            <div className="d-flex align-items-center">
              <div className="mt-1 me-1">
                <i className="ri-save-line "></i>
              </div>
              <div className=""> Save</div>
            </div>
          </button>
          <button
            className=" bg-danger text-light  border-0 px-4 py-1 rounded-1 mt-3 ms-3"
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="d-flex align-items-center">
              <div className="mt me-1">
                <i className="ri-arrow-left-line"></i>
              </div>
              <div className=""> Back</div>
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default EmployeeEdit;
