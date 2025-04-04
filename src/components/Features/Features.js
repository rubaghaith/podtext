import React from "react";
import "./Features.css";
import ta from "../../assets/images/ta.png";
import tahoel from "../../assets/images/tahoel.png";
import ask from "../../assets/images/ask.png";
import { BiFontSize } from "react-icons/bi";
function Features() {
  return (
    <section className="features">
      <h2>مميزاتنا الحالية </h2>
      <br />
      
      <p >
        نؤمن بأن القراءة هي المفتاح للتعلم والنمو، حيث تمهد الطريق لتطوير المهارات<br />
        الأكاديمية والاجتماعية. وتعزز لغة الطلاب بأنفسهم ، مما يدفعهم نحو النجاح في جميع<br />
        جوانب حياتهم
        <br />
      </p>
      <br />
      <br />
      <div className="features-container">
        <div className="feature">
        <img src={tahoel} alt="tahoel" className="ta" />
          
          <h2>تحويل الفيديو إلى نص</h2>
          <p>تحويل الفيديو إلى نص مكتوب</p>
        </div>
        <br />
        <div className="feature">
        <img src={ta} alt="ta" className="ta" />
          <h2>تلخيص</h2>
          <p>تلخيص النص الذي تم استخراجه الى نص مختصر مع اعطاء نقاط مهمة <br /></p>
        </div>
        
        <div className="feature">
        <img src={ask} alt="ask" className="ta" />        
          <h2>سؤال وجواب</h2>
          <p>الاجابة على الاسئلة التي يطرحها <br />المستخدم من خلال محادثة AI</p>
        </div>
      </div>
    </section>
  );
}

export default Features;