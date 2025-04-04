import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Signup.css';
import logo from "../../assets/images/logo.png"; 
import mainImage from "../../assets/images/main-image.png"; 

const Signup = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 
  const [username, setUsername] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !email || !password || !confirmPassword) {
      setError('جميع الحقول مطلوبة!');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة.');
      return;
    }

    try {
      const response = await axios.post('http://localhost/podtext-api/register.php', {
        username,  
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.status === 'success') {
        setSuccess('تم إنشاء الحساب بنجاح! سيتم تحويلك إلى صفحة تسجيل الدخول...');
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('حدث خطأ أثناء إنشاء الحساب. حاول مرة أخرى.');
    }
};

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-image">
          <img src={mainImage} alt="Main Illustration" className="main-image" />
        </div>
        <div className="signup-content">
          <img src={logo} alt="Logo" className="logoo" />
          <p>قم بإنشاء حساب جديد للوصول إلى محتويات الموقع</p>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <form onSubmit={handleSubmit}>
          <div className="input-group">
  <input 
    type="text" 
    className='small-input'
    placeholder="أدخل اسم المستخدم" 
    value={username} 
    onChange={(e) => setUsername(e.target.value)} 
    required 
  />
</div>

            <div className="input-group">
              <input 
                type="email" 
                className='small-input'
                placeholder="أدخل البريد الإلكتروني الخاص بك" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                className='small-input'
                placeholder="أدخل كلمة المرور الخاصة بك" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                className='small-input'
                placeholder="تأكيد كلمة المرور" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="signup-button">إنشاء حساب</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
