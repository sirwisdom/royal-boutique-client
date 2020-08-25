import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { store } from "react-notifications-component";
import Preloader from "../Preloader/Preloader";
import { useSelector } from "react-redux";
import { url } from "../../config";
import "./allprograms.css";
import NoData from "../NoData/NoData";

function AllPrograms() {
  const [allPrograms, setAllPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${url}/programs/`)
      .then((res) => {
        setAllPrograms(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async () => {
    try {
      setIsSubmiting(true);
      const result = await axios.delete(`${url}/programs/delete/${currentId}`);
      if (result.status === 200) {
        setIsSubmiting(false);
        store.addNotification({
          message: `The program have been deleted successfully`,
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
      setIsSubmiting(false);
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
        message: `Sorry, an unexpected error occured while deleting the program`,
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
    <div className="testimonies-div">
      {isApproving ? (
        <div className="approve-modal">
          <div className="approve-modal-inner">
            <p>
              This action will delete this program permanently, do you wish to
              continue
            </p>
            <div className="approve-btn-div">
              {isSubmiting ? (
                <button className="continue" disabled>
                  Deleting
                </button>
              ) : (
                <button className="continue" onClick={() => handleDelete()}>
                  Continue
                </button>
              )}
              <button className="cancel" onClick={() => setIsApproving(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {allPrograms.length > 0 ? (
        <div className="allprograms-row">
          <h2 className="allprograms-heading">Table of All Programs</h2>
          <table className="allprograms-table">
            <thead className="allprograms-table-head">
              <tr className="allprograms-table-head-row">
                <th>NO</th>
                <th>Date Posted</th>
                <th className="program-description-th">Title of Program</th>
                <th>Image</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody className="allprograms-table-body">
              {allPrograms.map((program, index) => {
                return (
                  <tr className="program-inner" key={program._id}>
                    <td>{index + 1}</td>
                    <td>{moment(program.createdAt).format("MMMM Do YYYY")}</td>

                    <td className="program-description-td">
                      <p className="program-description">
                        {program.programTitle}
                      </p>
                    </td>
                    <td>
                      <img
                        src={program.programUrl}
                        alt="program"
                        className="program-image"
                      />
                    </td>
                    <td>
                      <button
                        className="program-delete-btn"
                        onClick={() => {
                          setCurrentId(program._id);
                          setIsApproving(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/dashboard/${userData._id}/allprograms/${program._id}`}
                        className="readmore-link"
                      >
                        Edit
                      </Link>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <NoData text={"Sorry, No Program uploaded yet"} />
      )}
    </div>
  );
}

export default AllPrograms;
