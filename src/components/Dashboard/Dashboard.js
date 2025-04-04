import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import logo from "../../assets/images/logo.png";
import profilePic from "../../assets/images/profile.jpg";
import nisba from "../../assets/images/nisba.png";
import nsba from "../../assets/images/nsba.png";
import avg from "../../assets/images/avg.png";
import axios from "axios";


import "./Dashboard.css";
const handleLogout = async () => {
  try {
    const response = await axios.post("http://localhost/podtext-api/logout.php", {}, {
      withCredentials: true,
    });

    if (response.data.status === "success") {
      localStorage.removeItem("user"); 
      window.location.href = "/login"; 
    } else {
      alert("⚠️ لم يتم تسجيل الدخول مسبقًا.");
    }
  } catch (error) {
    console.error("❌ خطأ أثناء تسجيل الخروج:", error);
    alert("⚠️ حدث خطأ أثناء تسجيل الخروج.");
  }
};


const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const response = await axios.get("http://localhost/podtext-api/check_session.php", {
                withCredentials: true
            });

            console.log("🔍 حالة الجلسة:", response.data);

            if (response.data.status !== "success") {
                navigate("/login");  
            }
        } catch (error) {
            console.error("❌ خطأ أثناء التحقق من الجلسة:", error);
            navigate("/login");
        }
    };

    checkAuth();
}, [navigate]);


  const handleAddFileClick = () => {
    navigate("/file-upload");
  };

  const handleChatClick = () => {
    navigate("/Chatting");
  };
  const handlevideoClick = () => {
    navigate("/VideoTranscription");
  };
  const handleFileClick = () => {
    navigate("/FileList");
  };
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <ul>
          <li className="active">الرئيسية</li>
          <li onClick={handleFileClick}>الملفات</li>
          <li>الإعدادات</li>
          <li onClick={handleChatClick}>الشات</li>
          <li onClick={handlevideoClick}>التلخيص</li>
        </ul>
        <button onClick={handleLogout} className="logout-button">
  تسجيل الخروج
</button>

      </div>
      <div className="main-content">
        <div className="top-bar">
          <div className="profile-container">
            <img src={profilePic} alt="User" className="profile-pic" />
          </div>
          <div className="search-container">
            <IoMdSearch className="search-icon" />
            <input type="text" placeholder="ابحث عن ..." className="search-box" />
          </div>
        </div>
        <br />
        <br />
        <div className="stats">
          <img src={nisba} alt="إجمالي عدد الصم" className="stat-image" />
          <img src={nsba} alt="إجمالي عدد المتعلمين" className="stat-image" />
        </div>
        <br />
        <br />
        <div className="chart-container">
          <img src={avg} alt="توزيع الأفراد ذوي الإعاقة حسب الجنس" className="chart-image" />
        </div>

        <button className="add-file" onClick={handleAddFileClick}>
          <FaPlus /> إضافة ملف
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
