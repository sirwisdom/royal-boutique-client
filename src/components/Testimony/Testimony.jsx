import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { store } from "react-notifications-component";
import { useSelector } from "react-redux";
import { url } from "../../config";
import "./testimony.css";
import Preloader from "../Preloader/Preloader";

function Testimony(props) {
  const userData = useSelector((state) => state.user.data);

  const { testimonyId } = props.match.params;
  const [loading, setLoading] = useState(true);
  const [testimony, setTestimony] = useState({});
  const [isApproving, setIsApproving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    axios
      .get(`${url}/testimony/${testimonyId}`)
      .then((res) => {
        setTestimony(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [testimonyId]);

  const handleApprove = async () => {
    try {
      const result = await axios.put(
        `${url}/testimony/approve/${testimony._id}`,
        {
          isApproved: true,
        }
      );

      if (result && result.status === 200) {
        setIsApproving(false);
        store.addNotification({
          message: `${testimony.name}'s have been approved successfully`,
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
          window.location.href = `/dashboard/${userData._id}/approvetestimonies`;
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        store.addNotification({
          message: `Sorry, could not approve the testimony. An Unexpected error just occured`,
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
    }
  };

  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        `${url}/testimony/delete/${testimony._id}`
      );

      if (result && result.status === 200) {
        setIsApproving(false);
        store.addNotification({
          message: `${testimony.name}'s have been deleted successfully`,
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
          window.location.href = `/dashboard/${userData._id}/approvetestimonies`;
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        store.addNotification({
          message: `Sorry, could not delete this testimony. An Unexpected error just occured`,
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
    }
  };
  return loading ? (
    <Preloader />
  ) : (
    <div className="testimony-approval-div">
      {isApproving ? (
        <div className="approve-modal">
          <div className="approve-modal-inner">
            <p>
              This action will approve this testimony, and render it active
              thereby becoming visible to the public, do you wish to continue
            </p>
            <div className="approve-btn-div">
              <button className="continue" onClick={() => handleApprove()}>
                Continue
              </button>
              <button className="cancel" onClick={() => setIsApproving(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {isDeleting ? (
        <div className="approve-modal">
          <div className="approve-modal-inner">
            <p>
              This action will delete this testimony permanently, do you wish to
              continue
            </p>
            <div className="approve-btn-div">
              <button className="continue" onClick={() => handleDelete()}>
                Continue
              </button>
              <button className="cancel" onClick={() => setIsDeleting(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <h2 className="testimony-approval-heading">Testimony</h2>
      <h3 className="testimony-approval-name">{testimony.name}'s Testimony</h3>
      <p className="testimony-approval-date">
        Testimony was posted on:{" "}
        {moment(testimony.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <p className="testimony-approval-text">{testimony.testimony}</p>

      <br />
      <div className="testimony-btn-div">
        {testimony.isApproved ? null : (
          <button
            type="submit"
            className="testimony-approval-btn"
            onClick={() => setIsApproving(true)}
          >
            Approve
          </button>
        )}

        <button
          type="submit"
          className="testimony-delete-btn"
          onClick={() => setIsDeleting(true)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Testimony;
