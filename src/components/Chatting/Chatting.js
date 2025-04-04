import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaHome, FaCog, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { TiArrowRepeatOutline } from "react-icons/ti";
import "./Chatting.css";

const Chatting = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const navigate = useNavigate(); 

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  
  const handleFileListClick = () => {
    navigate("/FileList");
  };

  return (
    <div className="chat-container">
      <aside className="sidebarr">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <nav className="sidebar-nav">
          <a>القائمة</a>
          <a onClick={() => navigate("/")} className="sidebar-link"><FaHome /> الرئيسية</a>
          <a onClick={handleFileListClick} className="sidebar-link">📂 الملفات</a> 
          <a onClick={() => navigate("/settings")} className="sidebar-link"><FaCog /> الإعدادات</a>
        </nav>
        <div>
          <button className="add-btn"><FaPlus /> +</button>
          <button className="re-btn"><TiArrowRepeatOutline /></button>
        </div>
      </aside>

      <div className="main-content">
        <div className="top-barr">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="بحث عن..." className="search-input" />
          </div>
        </div>

        <main className="chat-main">
          <div className="chat-header">
            <h2 className="chat-title">Chatty AI</h2>
            <p className="chat-subtitle">أنا هنا لمساعدتك في كل</p>
            <p className="chat-subtitle"> ما تحتاجه، دعنا نتحدث!</p>
          </div>
          
          <div className="messages-box" ref={chatRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
                {msg.text}
              </div>
            ))}
          </div>
          
          <div className="input-box">
            <input
              type="text"
              className="chat-input"
              placeholder="اكتب رسالتك هنا..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="send-btn" onClick={sendMessage}>إرسال</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chatting;
