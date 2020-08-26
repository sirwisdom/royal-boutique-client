import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { store } from "react-notifications-component";
import * as Yup from "yup";
import { url } from "../../config";
import "./uploadprogram.css";

function UploadProgram() {
  const userData = useSelector((state) => state.user.data);

  const [isUploading, setIsUploading] = useState(false);

  const initialValues = {
    // description: "",
    program: "",
    programStartDate: "",
    programTime: "",
    programTitle: "",
  };

  const ProgramSchema = Yup.object({
    programStartDate: Yup.string().min(2).required("Date is a required field"),
    programTime: Yup.string()
      .min(2)
      .required("Time of program is a required field"),
    programTitle: Yup.string()
      .min(2)
      .required("Title of program is a required field"),
    // description: Yup.string()
    //   .min(2)
    //   .required("Description is a required field"),
    program: Yup.string().min(3).required("Program is a required field"),
  });

  const handleSubmit = async (values) => {
    const {
      program,
      // description,
      programStartDate,
      programTime,
      programTitle,
    } = values;

    const formData = new FormData();
    formData.append("file", program);
    // formData.append("description", description);
    formData.append("programStartDate", programStartDate);
    formData.append("programTime", programTime);
    formData.append("programTitle", programTitle);

    try {
      setIsUploading(true);
      const result = await axios.post(
        `${url}/programs/${userData._id}`,
        formData
      );
      if (result.status === 200) {
        setIsUploading(false);
        store.addNotification({
          message: `The program have been uploaded successfully`,
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 4000,
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
      store.addNotification({
        message: `Sorry, an unexpected error occured while uploading the program`,
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
    <div className="uploadprogram-wrapper">
      <h2 className="programupload-heading">Program Upload Form</h2>

      <div className="uploadprogram-form-div">
        <div className="program-form">
          <Formik
            initialValues={initialValues}
            validationSchema={ProgramSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched, handleChange, handleBlur, setFieldValue }) => (
              <Form>
                <div className="program-form-group">
                  <label htmlFor="programTitle" className="program-form-label">
                    Title of Program:
                  </label>
                  <input
                    type="text"
                    id="programTitle"
                    name="programTitle"
                    onChange={handleChange}
                  />
                </div>
                <div className="program-form-group">
                  <label
                    htmlFor="programStartDate"
                    className="program-form-label"
                  >
                    Starting date of Program:
                  </label>
                  <input
                    type="date"
                    id="programStartDate"
                    name="programStartDate"
                    onChange={handleChange}
                  />
                </div>
                <div className="program-form-group">
                  <label htmlFor="programTime" className="program-form-label">
                    Time of Program:
                  </label>
                  <input
                    type="time"
                    id="programTime"
                    name="programTime"
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="program-form-group">
                  <label htmlFor="description" className="program-form-label">
                    Enter the details of program
                  </label>
                  <textarea
                    type="text"
                    className="program-form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="description"
                    name="description"
                  />
                  {errors.description && touched.description ? (
                    <div className="text-danger">
                      {" "}
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.description}
                    </div>
                  ) : null}
                </div> */}
                <div className="program-form-group">
                  <label htmlFor="program">
                    Choose a picture to be uploaded
                  </label>
                  <input
                    type="file"
                    id="program"
                    name="program"
                    onChange={(event) => {
                      setFieldValue("program", event.currentTarget.files[0]);
                    }}
                  />
                </div>
                {isUploading ? (
                  <button type="submit" disabled className="uploadprogram-btn">
                    Uploading
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="uploadprogram-btn"
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

export default UploadProgram;
