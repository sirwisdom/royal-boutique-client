import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import { store } from "react-notifications-component";
import * as Yup from "yup";
import { url } from "../../config";
import "./editbranch.css";
import Preloader from "../Preloader/Preloader";

function EditBranch(props) {
  const { branchId } = props.match.params;
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [branch, setBranch] = useState({});

  let initialValues;

  useEffect(() => {
    axios
      .get(`${url}/branch/${branchId}`)
      .then((res) => {
        setBranch(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!loading) {
    initialValues = {
      name: branch.name,
      address: branch.address,
    };
  }

  const BranchSchema = Yup.object({
    name: Yup.string().min(2).required("Name of Branch is a required field"),
    address: Yup.string()
      .min(3)
      .required("Address of Branch is a required field"),
  });

  const handleSubmit = async (values) => {
    try {
      setIsUploading(true);
      const result = await axios.put(`${url}/branch/${branchId}`, values);
      if (result.status === 200) {
        setIsUploading(false);
        store.addNotification({
          message: `${values.name} have been updated successfully`,
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setIsUploading(false);
      if (error.response && error.response.data) {
        return store.addNotification({
          message: `${error.response.data.msg}`,
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 4000,
            onScreen: true,
          },
        });
      }
      store.addNotification({
        message: `Sorry, an unexpected error just occured while Updating ${values.name}`,
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true,
        },
      });
    }
  };
  return loading ? (
    <Preloader />
  ) : (
    <div className="uploadbranch-wrapper">
      <h2 className="uploadbranch-heading">Edit Branch</h2>

      <div className="uploadbranch-form-div">
        <div className="uploadbranch-form">
          <Formik
            initialValues={initialValues}
            validationSchema={BranchSchema}
            validateOnChange={true}
            validateOnBlur={true}
            enableReinitialize={true}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <div className="uploadbranch-form-group">
                  <label htmlFor="address">Enter the Name of Branch</label>
                  <Field
                    type="text"
                    className="uploadbranch-form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="name"
                    name="name"
                  />
                  {errors.name && touched.name ? (
                    <div className="text-danger">
                      {" "}
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.name}
                    </div>
                  ) : null}
                </div>
                <div className="uploadbranch-form-group">
                  <label htmlFor="address">
                    Enter the address of the branch
                  </label>
                  <Field
                    type="text"
                    className="uploadbranch-form-control"
                    id="address"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address && touched.address ? (
                    <div className="text-danger">
                      {" "}
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.address}
                    </div>
                  ) : null}
                </div>
                {isUploading ? (
                  <button
                    type="submit"
                    disabled
                    className="uploadbranch-btn"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Uploading
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="uploadbranch-btn"
                    // onClick={() => {
                    //   handleSubmit();
                    // }}
                  >
                    Upload
                  </button>
                )}
              </Form>
            )}
          </Formik>
          <br />
        </div>
      </div>
    </div>
  );
}

export default EditBranch;
