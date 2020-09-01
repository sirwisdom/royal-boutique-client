import React from "react";
import { Link } from "react-router-dom";
import Image1 from "../Assets/img1.jpeg";
import Image2 from "../Assets/img2.jpeg";
import Image3 from "../Assets/img3.jpeg";
import Image4 from "../Assets/img4.jpeg";
import Image5 from "../Assets/img5.jpeg";
import Image6 from "../Assets/img6.jpeg";
import Image7 from "../Assets/img7.jpg";
import Image8 from "../Assets/img8.png";
import "./home.css";
import { useSelector } from "react-redux";

function Home() {
  const userData = useSelector((state) => state.user.data);

  return (
    <div className="home-div">
      <section className="userwelcome-div">
        <h3 className="userwelcome-text">
          Welcome {userData.firstName} {userData.lastName}
        </h3>
      </section>
      {/* End of Hero Header Section    */}

      {/* Begining of Overview Section    */}
      <section className="overview-wraper">
        <div className="overview-container">
          <div className="overview-single" id="overview-5">
            <div className="overview-img-div">
              <img src={Image5} alt="Testimony " className="overview-img" />
            </div>

            <Link to={`/dashboard/${userData._id}/approvetestimonies`}>
              Approve Testimony
            </Link>
          </div>
          <div className="overview-single" id="overview-6">
            <div className="overview-img-div">
              <img
                src={Image2}
                alt="All Testimonies"
                className="overview-img"
              />
            </div>

            <Link to={`/dashboard/${userData._id}/alltestimonies`}>
              All Testimonies
            </Link>
          </div>
          <div className="overview-single" id="overview-1">
            <div className="overview-img-div">
              <img src={Image4} alt="sermons " className="Upload Sermon" />
            </div>

            <Link to={`/dashboard/${userData._id}/uploadsermon`}>
              Upload Sermon
            </Link>
          </div>
          <div className="overview-single" id="overview-2">
            <div className="overview-img-div">
              <img src={Image1} alt="sermons" className="Approve Testimony" />
            </div>

            <Link to={`/dashboard/${userData._id}/allsermons`}>
              View All Sermons
            </Link>
          </div>
          <div className="overview-single" id="overview-3">
            <div className="overview-img-div">
              <img
                src={Image3}
                alt="upload programs "
                className="Approve Testimony"
              />
            </div>

            <Link to={`/dashboard/${userData._id}/uploadprogram`}>
              Upload Program
            </Link>
          </div>
          <div className="overview-single" id="overview-4">
            <div className="overview-img-div">
              <img src={Image6} alt="all programs " className="overview-img" />
            </div>

            <Link to={`/dashboard/${userData._id}/allprograms`}>
              View All Programs
            </Link>
          </div>
          <div className="overview-single" id="overview-7">
            <div className="overview-img-div">
              <img src={Image8} alt="all programs " className="overview-img" />
            </div>

            <Link to={`/dashboard/${userData._id}/uploadbranch`}>
              Upload Branch
            </Link>
          </div>

          <div className="overview-single" id="overview-8">
            <div className="overview-img-div">
              <img src={Image7} alt="all programs " className="overview-img" />
            </div>

            <Link to={`/dashboard/${userData._id}/allbranches`}>
              View All Branches
            </Link>
          </div>
        </div>
      </section>
      {/* End of Upcoming Programs Section    */}
    </div>
  );
}

export default Home;
