import { useState } from "react";
import { FaTimes, FaCloudUploadAlt, FaSearch } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import "./FileUploadModal.css";

export default function FileUploadModal() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="file-upload-container">
      {}
      <div className="main-content">
        {}
        <div className="top-bar">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="بحث عن..." className="search-input" />
          </div>
        </div>

        {}
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-container">
              <button className="close-button" onClick={() => setIsOpen(false)}>
                <FaTimes size={20} />
              </button>
              <h2 className="modal-title">إضافة ملف</h2>
              <div className="modal-content">
                <input type="text" placeholder="اكتب اسم الفيديو هنا" className="input-field" />
                <input type="text" placeholder="اكتب تصنيف الفيديوا هنا " className="input-field" />
                <input type="text" placeholder="تاريخ الاضافة" className="input-field" />
            
                <div className="upload-area">
                  <FaCloudUploadAlt className="upload-icon" size={30} />
                  <p className="upload-text">قم بتحميل ملف MP3</p>
                </div>
                <button className="submit-button">إضافة الملف</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {}
      <aside className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="sidebar-link active">الرئيسية</a>
          <a href="#" className="sidebar-link">الملفات</a>
          <a href="#" className="sidebar-link">الإعدادات</a>
        </nav>
      </aside>
    </div>
  );
}
