import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import succesToast from "./successToast";
import errorToast from "./errorToast";
const EmployeeCreate = () => {
  const regexemail =  /^[a-z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const regexphone =/^[6-9]{1}[0-9]{9}$/;
  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("please fill the name"),
      email: yup
        .string()
        .required("Please enter your Email")
        .matches(regexemail, "Invalid email"),
      phone: yup
        .string()
        .required("required")
        .matches(regexphone, "Invalid number"),
    }),

    onSubmit: (values) => {
      console.log(values);
      fetch("http://localhost:8000/Employee", {
        method: "Post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => {
          return res.json();

        })
        .then((response) => {
          console.log(response);
          navigate('/')
          succesToast('created Successfully')

        })
        .catch((err) => {
          console.log(err);
          errorToast('Error')
        });
    },
  });
  return (
    <>

      <div className="d-flex justify-content-center align-items-center vh-100  font_family_poppins">
        <form>
          <div>
            <div>
              <label className="fs_18 fw_500 mb-1 mt-2">Name</label>
            </div>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ outline: "none" }}
              className={
                formik.touched.name && formik.errors.name
                  ? " px-3 py-1  w-100 rounded border-red"
                  : " px-3 py-1  w-100 rounded "
              }
            />
            <div className="fs_16  mt-1  ">
              {formik.touched.name && formik.errors.name ? (
                <span className="text-danger">{formik.errors.name}</span>
              ) : null}
            </div>
          </div>
          <div>
            <div>
              <label className="fs_18 fw_500 mb-1 mt-2">Email</label>
            </div>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ outline: "none" }}
              className={
                formik.touched.email && formik.errors.email
                  ? " px-3 py-1  w-100 rounded border-red"
                  : " px-3 py-1  w-100 rounded"
              }
            />
            <div className="fs_16  mt-1  ">
              {formik.touched.email && formik.errors.email ? (
                <span className="text-danger">{formik.errors.email}</span>
              ) : null}
            </div>
          </div>
          <div>
            <div>
              <label className="fs_18 fw_500 mb-1 mt-2">Phone</label>
            </div>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ outline: "none" }}
              className={
                formik.touched.phone && formik.errors.phone
                  ? " px-3 py-1  w-100 rounded border-red"
                  : " px-3 py-1  w-100 rounded"
              }
            />
            <div className="fs_16  mt-1  ">
              {formik.touched.phone && formik.errors.phone ? (
                <span className="text-danger">{formik.errors.phone}</span>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className=" bg-success text-light  border-0 px-4 py-1 rounded-1 mt-3 "
            onClick={formik.handleSubmit}
          >
            <div className="d-flex align-items-center">
              <div className="mt me-1">
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
export default EmployeeCreate;
