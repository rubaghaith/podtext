import React from "react";
import "./InfoBox.css";
import logo from "../../assets/images/logo.png"; 
function InfoBox() {
  return (
    <div className="info-box">
      <div className="info-column">
      <img src={logo} alt="Logo" className="logo" /> 
        <h3>تابعنا عبر تواصل الاجتماعي </h3>
        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
      </div>
      </div>
      <div className="info-column">
        <h3>تواصل معنا </h3>
        <p>فلسطين - الخليل 
        <br />
        059324255555
        </p>
      </div>
      <div className="info-column">
        <h3>روابط </h3>
        <p>رئيسية 
        <br />
        مميزاتنا
        </p>
      </div>
    </div>
  );
}

export default InfoBox;