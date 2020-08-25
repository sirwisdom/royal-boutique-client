import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Preloader from "../Preloader/Preloader";
import { useSelector } from "react-redux";
import { url } from "../../config";
import "./alltestimonies.css";
import NoData from "../NoData/NoData";
import ReactPaginate from "react-paginate";

function AllTestimonies() {
  const [allTestimonies, setAllTestimonies] = useState([]);
  const [filteredTestimonies, setFilteredTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.user.data);

  const perPage = 50;
  let offSet = 0;
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${url}/testimony/approve`)
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
    <div className="alltestimonies-div">
      {filteredTestimonies.length > 0 ? (
        <div>
          <h2 className="alltestimonies-heading">Approved Testimonies</h2>

          <div className="alltestimonies-row">
            <table className="alltestimonies-table">
              <thead className="alltestimonies-table-head">
                <tr className="alltestimonies-table-head-row">
                  <th>Date Posted</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="alltestimonies-table-body">
                {filteredTestimonies.map((testimony) => {
                  return (
                    <tr className="alltestimonies-inner" key={testimony._id}>
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
          </div>
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
        <NoData text={"Sorry, No Testimony Submitted Yet"} />
      )}
    </div>
  );
}

export default AllTestimonies;
