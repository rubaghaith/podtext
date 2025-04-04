import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaSearch, FaTrash, FaCommentDots, FaBookOpen } from "react-icons/fa"; 
import logo from "../../assets/images/logo.png";
import "./FileList.css";

const FileList = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileCategory, setFileCategory] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost/podtext-api/logout.php", {}, { withCredentials: true });
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

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost/podtext-api/get-files.php", { withCredentials: true });
      if (response.data.status === "success") {
        setFiles(response.data.files || []);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("❌ خطأ أثناء جلب الملفات:", error);
      setFiles([]);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fileName || !fileCategory || !videoFile) {
      setError("❌ يرجى تعبئة جميع الحقول واختيار فيديو.");
      return;
    }

    const formData = new FormData();
    formData.append("file_name", fileName);
    formData.append("file_category", fileCategory);
    formData.append("video_file", videoFile);

    try {
      const response = await axios.post("http://localhost/podtext-api/add_file.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data.status === "success") {
        setSuccess("✅ تم إضافة الملف بنجاح!");
        fetchFiles();
        setFileName("");
        setFileCategory("");
        setVideoFile(null);
        setTimeout(() => {
          setSuccess("");
          setShowModal(false);
        }, 2000);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("⚠️ حدث خطأ أثناء رفع الملف.");
    }
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm("❌ هل أنت متأكد من أنك تريد حذف هذا الملف؟")) return;

    try {
      const response = await axios.post("http://localhost/podtext-api/delete-file.php", { file_id: fileId });

      if (response.data.status === "success") {
        alert("✅ تم حذف الملف بنجاح!");
        setFiles(files.filter(file => file.id !== fileId));
      } else {
        alert(`⚠️ فشل الحذف: ${response.data.message}`);
      }
    } catch (error) {
      console.error("❌ خطأ أثناء الحذف:", error);
      alert("⚠️ حدث خطأ أثناء حذف الملف.");
    }
  };

  return (
    <div className="container">
      <div className="sideba">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <nav className="sidebar-nav">
          <a href="/dashboard" className="sidebar-link">🏠 الرئيسية</a>
          <a href="/FileList" className="sidebar-link active">📂 الملفات</a>
          <a href="/settings" className="sidebar-link">⚙️ الإعدادات</a>
        </nav>
        <button onClick={handleLogout} className="logout-button">تسجيل الخروج</button>
      </div>

      <div className="content">
        <div className="top-ba">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input type="text" className="search-input" placeholder="بحث عن الملفات..." />
          </div>
        </div>

        <h2 className="table-title">قائمة الملفات</h2>

        <div className="add-file-container">
          <button className="add-file-button" onClick={() => setShowModal(true)}>
            <FaPlus /> إضافة ملف جديد
          </button>
        </div>

        {showModal && <div className="modal-overlay" onClick={() => setShowModal(false)}></div>}

        {showModal && (
          <div className="modal">
            <form onSubmit={handleFileUpload} className="modal-content">
              <h3>إضافة ملف جديد</h3>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
              <input type="text" placeholder="اسم الملف" value={fileName} onChange={(e) => setFileName(e.target.value)} required />
              <input type="text" placeholder="تصنيف الملف" value={fileCategory} onChange={(e) => setFileCategory(e.target.value)} required />
              <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} required />
              <button type="submit">إضافة</button>
              <button type="button" onClick={() => setShowModal(false)}>إلغاء</button>
            </form>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>رقم الملف</th>
              <th>اسم الملف</th>
              <th>تصنيف الملف</th>
              <th>حالة الملف</th>
              <th>تاريخ الإضافة</th>
              <th>الخيارات</th>
            </tr>
          </thead>
          <tbody>
            {files.length > 0 ? (
              files.map((file) => (
                <tr key={file.id}>
                  <td>{file.file_number}</td>
                  <td>{file.file_name}</td>
                  <td>{file.file_category}</td>
                  <td className={file.file_status === "تم التحميل" ? "completed" : "pending"}>
                    {file.file_status}
                  </td>
                  <td>{file.created_at}</td>
                  <td className="actions">
                    <FaBookOpen className="icon summary" onClick={() => navigate("/VideoTranscription", { state: { file } })} />
                    <FaCommentDots className="icon chat" onClick={() => navigate("/Chatting", { state: { file } })} />
                    <FaTrash className="icon delete" onClick={() => handleDelete(file.id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>لا يوجد ملفات</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
