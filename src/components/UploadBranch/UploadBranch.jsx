import React, { useState } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import { store } from "react-notifications-component";
import * as Yup from "yup";
import { url } from "../../config";
import "./uploadbranch.css";
import DisabledButton from "../Utils/DisabledButton/DisabledButton";

function UploadBranch() {
  const [isUploading, setIsUploading] = useState(false);

  const initialValues = {
    name: "",
    address: "",
  };

  const BranchSchema = Yup.object({
    name: Yup.string().min(2).required("Name of Branch is a required field"),
    address: Yup.string()
      .min(3)
      .required("Address of Branch is a required field"),
  });

  const handleSubmit = async (values) => {
    try {
      setIsUploading(true);
      const result = await axios.post(`${url}/branch`, values);
      if (result.status === 200) {
        setIsUploading(false);
        store.addNotification({
          message: `${values.name} have been uploaded successfully`,
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
      if (error.response) {
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
        message: `Sorry, an unexpected error just occured while registering ${values.name}`,
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
  return (
    <div className="uploadbranch-wrapper">
      <h2 className="uploadbranch-heading">Upload A New Branch</h2>

      <div className="uploadbranch-form-div">
        <div className="uploadbranch-form">
          <Formik
            initialValues={initialValues}
            validationSchema={BranchSchema}
            validateOnChange={true}
            validateOnBlur={true}
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
                    placeholder="MFM Opolo"
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
                    placeholder="No. 10 John Doe Street, Opolo, Yenegoa, Bayelsa State"
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
                  <DisabledButton text={"Uploading"} />
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

export default UploadBranch;
