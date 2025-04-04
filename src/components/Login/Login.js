import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { FaLock, FaEnvelope } from "react-icons/fa";
import mainImage from "../../assets/images/main-image.png";
import logo from "../../assets/images/logo.png";


const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
  margin-right: 500px;
`;

const LoginBox = styled.div`
  display: flex;
  width: 800px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const LoginContent = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const Logo = styled.img`
  width: 60px;
  margin-bottom: 15px;
  align-self: flex-start;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: 16px;
  padding: 10px;
`;

const Icon = styled.div`
  color: #333;
  margin-right: 10px;
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-left: 5px;
`;

const ForgotPassword = styled(Link)`
  background: none;
  border: none;
  color: #2575fc;
  cursor: pointer;
  text-decoration: none;
`;

const LoginButton = styled.button`
  width: 100%;
  background: #2575fc;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;

  &:hover {
    background: #1b5fcf;
  }
`;

const LoginImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const MainImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost/podtext-api/login.php", {
        email,
        password
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true  
      });

    

      if (response.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(response.data.user)); 
        navigate("/dashboard"); 
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("⚠️ حدث خطأ أثناء تسجيل الدخول.");
      console.error("❌ خطأ أثناء تسجيل الدخول:", error);
    }
};

  return (
    <LoginContainer>
      <LoginBox>
        <LoginContent>
          <Logo src={logo} alt="Logo" />
          <Subtitle>قم بتسجيل الدخول حتى تستطيع الوصول إلى محتويات الموقع</Subtitle>
          {error && <p style={{ color: "red" }}>{error}</p>} {/*  عرض رسالة الخطأ إن وجدت */}
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Icon><FaEnvelope /></Icon>
              <Input
                type="email"
                placeholder="أدخل البريد الإلكتروني الخاص بك"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Icon><FaLock /></Icon>
              <Input
                type="password"
                placeholder="أدخل كلمة المرور الخاصة بك"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputGroup>
            <RememberForgot>
              <CheckboxLabel>
                <Checkbox
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                تذكرني
              </CheckboxLabel>
              <ForgotPassword to="/forgot-password">نسيت كلمة المرور؟</ForgotPassword>
            </RememberForgot>
            <LoginButton type="submit">تسجيل الدخول</LoginButton>
          </form>
        </LoginContent>
        <LoginImage>
          <MainImage src={mainImage} alt="Main Illustration" />
        </LoginImage>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
