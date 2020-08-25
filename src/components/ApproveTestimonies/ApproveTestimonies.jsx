import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Preloader from "../Preloader/Preloader";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { url } from "../../config";
import "./approvetestimonies.css";
import NoData from "../NoData/NoData";
function ApproveTestimonies() {
  const [allTestimonies, setAllTestimonies] = useState([]);
  const [filteredTestimonies, setFilteredTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.user.data);
  const perPage = 50;
  const offSet = 0;
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${url}/testimony/notApprove`)
      .then((res) => {
        setAllTestimonies(res.data);
        let initialTestimonies = res.data.slice(offSet, perPage);
        setFilteredTestimonies(initialTestimonies);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePageClick = (currentPage) => {
    let page = currentPage.selected * perPage;
    let clonedArray = [...allTestimonies];
    let Testimonies = [];
    Testimonies = clonedArray.slice(page, page + perPage);
    setFilteredTestimonies(Testimonies);
    return Testimonies;
  };

  return loading ? (
    <Preloader />
  ) : (
    <div className="testimonies-div">
      {filteredTestimonies.length > 0 ? (
        <div className="testimony-row">
          <h2 className="alltestimonies-heading">
            Testimonies Waiting For Approval
          </h2>
          <table className="testimony-table">
            <thead className="testimony-table-head">
              <tr className="testimony-table-head-row">
                {/* <th>NO</th> */}
                <th>Date Posted</th>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="testimony-table-body">
              {filteredTestimonies.map((testimony, index) => {
                return (
                  <tr className="testimony-inner" key={testimony._id}>
                    {/* <td>{index + 1}</td> */}
                    <td>
                      {moment(testimony.createdAt).format("MMMM Do YYYY")}
                    </td>

                    <td>{testimony.name}</td>
                    {testimony.isApproved ? (
                      <td>Approved </td>
                    ) : (
                      <td>Not Approved</td>
                    )}
                    <td>
                      <Link
                        to={`/dashboard/${userData._id}/approvetestimonies/${testimony._id}`}
                        className="readmore-link"
                      >
                        Read More
                      </Link>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          {allTestimonies.length > perPage ? (
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
              pageCount={Math.ceil(allTestimonies.length / perPage)}
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
        <NoData text={"Sorry, No Testimony have been submitted yet"} />
      )}
    </div>
  );
}

export default ApproveTestimonies;
