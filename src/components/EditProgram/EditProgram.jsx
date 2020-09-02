import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import { store } from "react-notifications-component";
import * as Yup from "yup";
import { url } from "../../config";
import "./editprogram.css";
import Preloader from "../Preloader/Preloader";

function EditProgram(props) {
  const { programId } = props.match.params;
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialProgram, setInitialProgram] = useState({});

  let initialValues;
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${url}/programs/${programId}`)
      .then((res) => {
        setInitialProgram(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [programId]);

  if (initialProgram) {
    initialValues = {
      description: initialProgram.description,
      programStartDate: initialProgram.programStartDate,
      programTime: initialProgram.programTime,
      programTitle: initialProgram.programTitle,
    };
  }

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
  });

  const handleSubmit = async (values) => {
    try {
      setIsUploading(true);
      const result = await axios.put(`${url}/programs/${programId}`, values);
      if (result.status === 200) {
        setIsUploading(false);
        store.addNotification({
          message: `The program have been updated successfully`,
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
        message: `Sorry, an unexpected error occured while updating the program`,
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
    <div className="editprogram-wrapper">
      <h2 className="editprogram-heading">Edit Program Form</h2>

      <div className="editprogram-form-div">
        <div className="editprogram-form">
          <Formik
            initialValues={initialValues}
            validationSchema={ProgramSchema}
            validateOnChange={true}
            validateOnBlur={true}
            enableReinitialize={true}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched, handleChange }) => (
              <Form>
                <div className="program-form-group">
                  <label htmlFor="programTitle" className="program-form-label">
                    Title of Program:
                  </label>
                  <Field
                    type="text"
                    id="programTitle"
                    name="programTitle"
                    onChange={handleChange}
                  />
                  {errors.programTitle && touched.programTitle ? (
                    <div className="text-danger">
                      {" "}
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.programTitle}
                    </div>
                  ) : null}
                </div>

                <div className="program-form-group">
                  <label
                    htmlFor="programStartDate"
                    className="program-form-label"
                  >
                    Starting date of Program:
                  </label>
                  <Field
                    type="date"
                    id="programStartDate"
                    name="programStartDate"
                    onChange={handleChange}
                  />
                  {errors.programStartDate && touched.programStartDate ? (
                    <div className="text-danger">
                      {" "}
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.programStartDate}
                    </div>
                  ) : null}
                </div>
                <div className="program-form-group">
                  <label htmlFor="programTime" className="program-form-label">
                    Time of Program:
                  </label>
                  <Field
                    type="time"
                    id="programTime"
                    name="programTime"
                    onChange={handleChange}
                  />
                  {errors.programTime && touched.programTime ? (
                    <div className="text-danger">
                      {" "}
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.programTime}
                    </div>
                  ) : null}
                </div>
                {/* <div className="program-form-group">
                  <label
                    htmlFor="program-description"
                    className="program-form-label"
                  >
                    Details of Program
                  </label>
                  <Field
                    type="textarea"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="program-description"
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

                {isUploading ? (
                  <button
                    type="submit"
                    disabled
                    className="uploadprogram-btn"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
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

export default EditProgram;
