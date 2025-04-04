import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "../../assets/images/main-image.png"; 
import logo from "../../assets/images/logo.png";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/verify");
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <div className="forgot-password-content">
          <img src={logo} alt="Logo" className="logo" />
          <p className="subtitle">لا تقلق! سنساعدك في استعادة حسابك.</p>
          <br />
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="أدخل البريد الإلكتروني الخاص بك"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
            </div>
            <button type="submit" className="forgot-password-button">إرسال رمز التأكيد</button>
          </form>
        </div>
        <div className="forgot-password-image">
          <img src={mainImage} alt="Main Illustration" className="main-imagee" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;