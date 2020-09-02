import React, { useState, useEffect } from "react";
import axios from "axios";
import { store } from "react-notifications-component";
import moment from "moment";
import "./allsermons.css";
import Preloader from "../Preloader/Preloader";
import ReactPaginate from "react-paginate";
import { url } from "../../config";
import NoData from "../NoData/NoData";

function AllSermons() {
  const [loading, setLoading] = useState(true);
  const [allSermons, setAllSermons] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filteredSermons, setFilteredSermons] = useState([]);

  const perPage = 100;
  const offSet = 0;
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${url}/sermons`)
      .then((res) => {
        setAllSermons(res.data);
        let initialSermons = res.data.slice(offSet, perPage);
        setFilteredSermons(initialSermons);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePageClick = (currentPage) => {
    let page = currentPage.selected * perPage;
    let clonedArray = [...allSermons];
    let sermons = [];
    sermons = clonedArray.slice(page, page + perPage);
    setFilteredSermons(sermons);
    return sermons;
  };
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
    <div className="allsermons-wrapper">
      {isDeleting ? (
        <div className="approve-modal">
          <div className="approve-modal-inner">
            <p>
              This action will delete this sermon permanently, do you wish to
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

      {filteredSermons.length > 0 ? (
        <div>
          <h2 className="allsermons-heading">All Sermons</h2>
          <div className="sermon-row">
            <table className="sermon-table">
              <thead className="sermon-table-head">
                <tr className="sermon-table-head-row">
                  <th>NO</th>
                  <th>Date Posted</th>
                  <th>Name of Sermon</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="sermon-table-body">
                {filteredSermons.map((sermon, index) => {
                  return (
                    <tr className="sermon-inner" key={sermon._id}>
                      <td>{index + 1}</td>
                      <td>{moment(sermon.createdAt).format("MMMM Do YYYY")}</td>
                      <td>{sermon.title}</td>
                      <td>
                        <audio controls>
                          <source src={sermon.sermonUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </td>
                      <td>
                        <button
                          className="sermon-delete-btn"
                          onClick={() => {
                            setCurrentId(sermon._id);
                            setCurrentName(sermon.title);
                            setIsDeleting(true);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>{" "}
          <br />
          {allSermons.length > perPage ? (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              previousClassName={"pagination-previous"}
              previousLinkClassName={"pagination-previous-link"}
              nextLinkClassName={"pagination-next-link"}
              nextClassName={"pagination-next"}
              breakClassName={"break-me"}
              pageClassName={"pagination-page"}
              pageLinkClassName={"pagination-link"}
              pageCount={Math.ceil(allSermons.length / perPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeLinkClassName={"pagination-active"}
              activeClassName={"active"}
            />
          ) : null}
        </div>
      ) : (
        <NoData text={"Sorry, No Sermon uploaded yet"} />
      )}
    </div>
  );
}

export default AllSermons;
