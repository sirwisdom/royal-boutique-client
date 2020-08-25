import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "react-notifications-component";
import "./allbranches.css";
import axios from "axios";
import { url } from "../../config";
import NoData from "../NoData/NoData";
import Preloader from "../Preloader/Preloader";

function AllBranches() {
  const userData = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [allBranches, setAllBranches] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${url}/branch`)
      .then((res) => {
        setAllBranches(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async () => {
    try {
      setIsSubmiting(true);
      const result = await axios.delete(`${url}/branch/delete/${currentId}`);
      if (result.status === 200) {
        setIsSubmiting(false);
        store.addNotification({
          message: `${currentName} have been deleted successfully`,
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
    <div className="allbranches-div">
      <Link
        to={`/dashboard/${userData._id}/newbranch`}
        className="uploadnewbranch-btn"
      >
        Upload New Branch
      </Link>

      {isDeleting ? (
        <div className="approve-modal">
          <div className="approve-modal-inner">
            <p>
              This action will delete this branch permanently, do you wish to
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
              <button className="cancel" onClick={() => setIsDeleting(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {allBranches.length > 0 ? (
        <div className="allbranches-row">
          <h2 className="allbranches-table-heading">Table of All Branches</h2>
          <table className="allbranches-table">
            <thead className="allbranches-table-head">
              <tr className="allbranches-table-head-row">
                <th>NO</th>
                <th>Name</th>
                <th>Address</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="allbranches-table-body">
              {allBranches.map((branch, index) => {
                return (
                  <tr className="branch-inner" key={branch._id}>
                    <td>{index + 1}</td>
                    <td>{branch.name}</td>
                    <td>{branch.address}</td>
                    <td
                      className="branch-delete"
                      onClick={() => {
                        setCurrentId(branch._id);
                        setCurrentName(branch.name);
                        setIsDeleting(true);
                      }}
                      style={{
                        color: "white",
                        background: "#e70000",
                      }}
                    >
                      Delete
                    </td>
                    <td>
                      <Link
                        to={`/dashboard/${userData._id}/allbranches/${branch._id}`}
                        className="editbranch-link"
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
        <NoData text={"No Branch have been uploaded"} />
      )}
    </div>
  );
}

export default AllBranches;
