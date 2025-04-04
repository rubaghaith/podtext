import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaHome, FaCog, FaSpinner } from "react-icons/fa";
import axios from "axios";
import Button from "../Button/Button";
import logo from "../../assets/images/logo.png";
import "./VideoTranscription.css";

const VideoTranscription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const file = location.state?.file || {};
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState("");
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState("");
  console.log("Video Path:", file.video_path);
  const handleSummarize = async () => {
    if (!file.video_path) {
      setError("لا يوجد ملف فيديو متاح للتلخيص");
      return;
    }

    setIsSummarizing(true);
    setError("");
    setSummary("");
    setTranscription("");

    try {
      // الخطوة 1: الحصول على النص من الفيديو
      const transcriptionResponse = await axios.post(
        "http://localhost:3000/get-transcription",
        { file_path: file.video_path },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (transcriptionResponse.data.status === "success") {
        const text = transcriptionResponse.data.transcription;
        setTranscription(text);

        // الخطوة 2: تلخيص النص
        const summaryResponse = await axios.post(
          "http://localhost:3000/summarize",
          { text },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (summaryResponse.data.status === "success") {
          setSummary(summaryResponse.data.summary);
        } else {
          setError("فشل في عملية التلخيص");
        }
      } else {
        setError("فشل في تحويل الفيديو إلى نص");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="video-transcription-container">
      <aside className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => navigate("/")} className="sidebar-link active">
            <FaHome /> الرئيسية
          </button>
          <button onClick={() => navigate("/FileList")} className="sidebar-link">
            الملفات
          </button>
          <button onClick={() => navigate("/settings")} className="sidebar-link">
            <FaCog /> الإعدادات
          </button>
        </nav>
      </aside>

      <div className="main-content">
        <div className="top-bar">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="بحث عن..." className="search-input" />
          </div>
        </div>

        <div className="video-card">
          <h2 className="video-title">{file.file_name || "اسم الفيديو غير متوفر"}</h2>
          {file.video_path ? (
            <a
              href={`http://localhost:3000/podtext-api/uploads/${file.video_path.split("/").pop()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="video-link"
            >
              {`http://localhost:3000/podtext-api/uploads/${file.video_path.split("/").pop()}`}
            </a>
          ) : (
            <p className="error-message">⚠️ لا يوجد رابط فيديو متاح!</p>
          )}
          <Button
            className="summarize-button"
            onClick={handleSummarize}
            disabled={isSummarizing || !file.video_path}
          >
            {isSummarizing ? (
              <>
                <FaSpinner className="spinner" /> جاري التلخيص...
              </>
            ) : (
              "التلخيص 🎤"
            )}
          </Button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="transcription-card">
          {transcription && (
            <>
              <h3 className="section-title">النص المفرغ</h3>
              <p className="description">{transcription}</p>
            </>
          )}

          {summary && (
            <>
              <h3 className="section-title">الملخص</h3>
              <p className="description">{summary}</p>
            </>
          )}

          {!transcription && !summary && (
            <>
              <h3 className="section-title">تعليمات الاستخدام</h3>
              <p className="description">
                اضغط على زر "التلخيص 🎤" لبدء عملية تحويل الفيديو إلى نص ثم تلخيصه.
              </p>
            </>
          )}

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: transcription && !summary ? "50%" : summary ? "100%" : "0%",
                }}
              ></div>
            </div>
            <span className="progress-text">
              {transcription && !summary ? "50%" : summary ? "100%" : "0%"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTranscription;