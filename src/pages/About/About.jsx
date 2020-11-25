import React, { useEffect } from "react";
import "./about.css";
// import Image1 from "../../Assets/img4.jpeg";
function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="about-image-branding">
        {/* <img src={Image1} alt="about us" className="about-image" /> */}
      </section>
      <div className="about-container">
        <div className="vision-div">
          <h2 className="vision-header">Who We Are</h2>
          <p className="vision-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis,
            nulla eius maiores quae doloribus accusamus eligendi, quos
            reiciendis, iure molestias nam possimus necessitatibus consequuntur.
            Consequatur dolorum sed ullam quia voluptatem.
          </p>
        </div>
        <div className="vision-div">
          <h2 className="vision-header">What We Do</h2>
          <p className="vision-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis,
            nulla eius maiores quae doloribus accusamus eligendi, quos
            reiciendis, iure molestias nam possimus necessitatibus consequuntur.
            Consequatur dolorum sed ullam quia voluptatem.
          </p>
        </div>
        <div className="vision-div">
          <h2 className="vision-header">Our Products</h2>
          <ul className="product-ul">
            <li className="product-li">Lorem ipsum dolor</li>
            <li className="product-li">Lorem ipsum dolor</li>
            <li className="product-li">Lorem ipsum dolor</li>
            <li className="product-li">Lorem ipsum dolor</li>
            <li className="product-li">Lorem ipsum dolor</li>
            <li className="product-li">Lorem ipsum dolor</li>
            <li className="product-li">Lorem ipsum dolor, etc</li>
          </ul>
        </div>
        <div className="opening-hours-div">
          <h2 className="opening-hours-heading">Opening Hours</h2>
          <p> Monday - Friday: 8:00am - 9:00pm</p>
          <p> Saturday: 9:00am - 6:00pm</p>
          <p> Sunday: 12:00pm - 5:00pm</p>
        </div>
      </div>
    </>
  );
}

export default About;
