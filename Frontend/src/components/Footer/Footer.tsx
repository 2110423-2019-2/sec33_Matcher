import React from "react";
import "./index.css";
import facebook from "./facebook.svg";
import instagram from "./instagram.svg";
import twitter from "./twitter.svg";

export default () => {
  return (
    <div className="footer">
      <div className="inc">© Matcher Inc.</div>
      <div className="contact">
        <img src={facebook} alt="facebook" className="contact-logo" />
        <img src={instagram} alt="facebook" className="contact-logo" />
        <img src={twitter} alt="facebook" className="contact-logo" />
      </div>
    </div>
  );
};
