import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { store } from "react-notifications-component";
import * as Yup from "yup";
import { url } from "../../config";
import "./livepage.css";

function LivePage() {
  const [isUploading, setIsUploading] = useState(false);

  const LivePageSchema = Yup.object({
    livePageUrl: Yup.string()
      .min(2)
      .required("The URL for the live feed is a required"),
  });

  const handleSubmit = async (values) => {
    try {
      setIsUploading(true);
      const result = await axios.post(`${url}/livePage`, values);
      if (result.status === 200) {
        setIsUploading(false);
        store.addNotification({
          message: `The URL have been uploaded successfully`,
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
    <div className="livepage-div">
      <div className="livepage-inner">
        <h3 className="livepage-heading">Upload Live Youtube Feed</h3>
        <div className="livepage-form">
          <Formik
            initialValues={{ livePageUrl: "" }}
            validationSchema={LivePageSchema}
            validateOnChange={true}
            validateOnBlur={true}
            enableReinitialize={true}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <div className="livepage-form-group">
                  <label htmlFor="livePageUrl" className="livepage-form-label">
                    URL for the live field:
                  </label>
                  <Field
                    type="text"
                    id="livePageUrl"
                    name="livePageUrl"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.livePageUrl && touched.livePageUrl ? (
                    <div className="text-danger">
                      {" "}
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.livePageUrl}
                    </div>
                  ) : null}
                </div>

                {isUploading ? (
                  <button type="submit" disabled className="uploadUrl-btn">
                    Uploading
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="uploadUrl-btn"
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
        </div>
      </div>
    </div>
  );
}

export default LivePage;
