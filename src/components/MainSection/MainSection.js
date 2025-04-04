import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./MainSection.css";
import mainImage from "../../assets/images/main-image.png"; 
import additionalImage from "../../assets/images/additional-image.png"; 

function MainSection() {
  const navigate = useNavigate(); 

  const handleStartClick = () => {
    navigate("/signup"); 
  };

  return (
    <section className="main-section">
      <div className="main-content">
        <br />
        <br />
        <br />
        <br />
        <h1>مرحباً بك في PodText</h1>
        <p>
          <br />
          يهدف هذا الموقع إلى مساعدة ذوي
          الاحتياجات الخاصة (الصم) على الاستفادة من البرامج التعليمية
          عن طريق تحويل الصوت من MP3 إلى نص
          وتلخيص هذا النص والسماح بطرح الأسئلة المطلوبة على الموقع.
        </p>
        <br />
        <button className="start-btn" onClick={handleStartClick}>ابدأ الآن</button> 
        <img src={additionalImage} alt="Additional Illustration" className="additional-image" /> 
      </div>
      
      <img src={mainImage} alt="Main Illustration" className="main-image" />
    </section>
  );
}

export default MainSection;