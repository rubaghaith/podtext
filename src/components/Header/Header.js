import React from "react";
import "./Header.css";
import logo from "../../assets/images/logo.png"; 
import { Link } from "react-router-dom"; 

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo-text">
          <img src={logo} alt="Logo" className="logo" />
          <Link to="/">الرئيسية</Link>
          <Link to="/features">مميزاتنا</Link>
          <Link to="/infobox">اتصل بنا</Link>
        </div>
      </div>
      <div className="auth-buttons">
        <Link to="/login" className="btn login">تسجيل الدخول</Link>
        <Link to="/signup" className="btn signup">إنشاء حساب</Link>
      </div>
    </header>
  );
}

export default Header;
