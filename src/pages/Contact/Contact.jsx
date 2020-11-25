import React from "react";
import "./contact.css";
function Contact() {
  return (
    <>
      <div className="contact-branding"></div>
      <div className="contact-container">
        <h1 className="contact-heading">Contact Us</h1>
       <h3 className="contact-text">
          <span className="contact-colored"> Address: </span> No. 1122, New
          Heavens Street, Island 12, Yenagoa Bayelsa State, Nigeria
        </h3>
       <h3 className="contact-text">
          <span className="contact-colored"> Phone: </span> 0810-134 -5678,
          0810-134 -5678, 0810-134 -5678{" "}
        </h3>
       <h3 className="contact-text">
          {" "}
          <span className="contact-colored"> Email: </span> johndoe@gmail.com
        </h3>
      </div>
    </>
  );
}

export default Contact;
