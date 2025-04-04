import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
import Features from './components/Features/Features';
import InfoBox from './components/InfoBox/InfoBox';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import Chatting from './components/Chatting/Chatting';
import FileUploadModal from './components/FileUploadModal/FileUploadModal';
import VideoTranscription from './components/VideoTranscription/VideoTranscription';
import ForgotPassword from './components/ForgotPassword/ForgotPassword'; 
import FileList from './components/FileList/FileList';
import Logout from "./components/Logout/Logout";



function App() {
  const [currentPage, setCurrentPage] = useState("main");
  const location = useLocation();

  const renderPage = () => {
    if (currentPage === "main") {
      return (
        <>
          <MainSection />
          <Features />
          <InfoBox />
        </>
      );
    } else if (currentPage === "features") {
      return <Features />;
    } else if (currentPage === "infobox") {
      return <InfoBox />;
    } else if (currentPage === "login") {
      return <Login setCurrentPage={setCurrentPage} />;
    } else if (currentPage === "signup") {
      return <Signup setCurrentPage={setCurrentPage} />;
    } else if (currentPage === "dashboard") {
      return <Dashboard />;
    } else {
      return (
        <>
          <MainSection />
          <Features />
          <InfoBox />
        </>
      );
    }
  };

  return (
    <div className="App" style={{ height: '100vh', overflowY: 'auto' }}>
      {location.pathname === "/" ? <Header setCurrentPage={setCurrentPage} /> : null}

      <Routes>
        <Route path="/" element={renderPage()} />
        <Route path="/login" element={<Login setCurrentPage={setCurrentPage} />} />
        <Route path="/signup" element={<Signup setCurrentPage={setCurrentPage} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/file-upload" element={<FileUploadModal />} />
        <Route path="/video-transcription" element={<VideoTranscription />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/FileList" element={<FileList />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/VideoTranscription" element={<VideoTranscription />} />
      </Routes>
    </div>
  );
}

export default App;