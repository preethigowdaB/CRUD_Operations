import React from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import succesToast from "./successToast";
import errorToast from "./errorToast";

const EmployeeDelete = ({ show, Hide, item_id }) => {
  const navigate = useNavigate();
  console.log(item_id);
  const dltfn = () => {
    fetch("http://localhost:8000/Employee/" + item_id, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        navigate("/");
        window.location.reload();
        succesToast("Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
        errorToast("Cannot deleted Error!");
      });
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={Hide}
        size="sm"
        centered={true}
        backdrop="static"
      >
        <Modal.Body>
          <div className="m-2 ff_poppins">
            <p className="fs_20 text-center fw_500">
              Are you Sure,you want to delete ?
            </p>
            <hr />
            <div className="text-center">
              <button
                className="border-0 rounded text-white fs_18 px-4 py-1 bg-success"
                onClick={() => dltfn()}
              >
                Yes
              </button>
              <button
                className="border-0 rounded text-white fs_18 px-4 py-1 bg-danger ms-4 "
                onClick={Hide}
              >
                No
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeDelete;
