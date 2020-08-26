import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Form, Formik, Field } from "formik";
import { store } from "react-notifications-component";
import * as Yup from "yup";
import { url } from "../../config";
import "./uploadsermon.css";

function UploadSermon() {
  const userData = useSelector((state) => state.user.data);

  const [isUploading, setIsUploading] = useState(false);

  const initialValues = {
    title: "",
    sermon: "",
  };

  const SermonSchema = Yup.object({
    title: Yup.string().min(2).required("Title is a required field"),
    sermon: Yup.string().min(3).required("Sermon is a required field"),
  });

  const handleSubmit = async (values) => {
    const { sermon, title } = values;

    const formData = new FormData();
    formData.append("file", sermon);
    formData.append("title", title);

    try {
      setIsUploading(true);
      const result = await axios.post(
        `${url}/sermons/${userData._id}`,
        formData
      );
      if (result.status === 200) {
        setIsUploading(false);
        store.addNotification({
          message: `${title}'s have been uploaded successfully`,
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
        message: `Sorry, an unexpected error occured while uploading the sermon`,
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
    <div className="uploadsermon-wrapper">
      <p>
        Hi, to upload a sermon, select an audio file from your computer, only
        files in audio (mp3) format are allowed.
      </p>
      <br />
      <div className="uploadsermon-form-div">
        <div className="sermon-form">
          <Formik
            initialValues={initialValues}
            validationSchema={SermonSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched, handleChange, handleBlur, setFieldValue }) => (
              <Form>
                <div className="sermon-form-group">
                  <label htmlFor="title">Title of Sermon</label>
                  <Field
                    type="text"
                    className="sermon-form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="title"
                    name="title"
                  />
                  {errors.title && touched.title ? (
                    <div className="text-danger">
                      {" "}
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.title}
                    </div>
                  ) : null}
                </div>
                <div className="signup-form-group">
                  <label htmlFor="sermon">
                    Choose a mp3 file to be uploaded
                  </label>
                  <input
                    type="file"
                    id="sermon"
                    name="sermon"
                    onChange={(event) => {
                      setFieldValue("sermon", event.currentTarget.files[0]);
                      // if (fileType[0].type !== "audio/mpeg") {
                      //   sermonRef.current.value = null;
                      //   return;
                      // }
                    }}
                  />
                </div>
                {isUploading ? (
                  <button
                    type="submit"
                    disabled
                    className="uploadsermon-btn"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Uploading
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="uploadsermon-btn"
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

export default UploadSermon;