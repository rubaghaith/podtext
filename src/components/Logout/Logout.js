import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.post("http://localhost/podtext-api/logout.php")
      .then(() => {
        localStorage.removeItem("user"); 
        navigate("/login"); 
      })
      .catch(error => {
        console.error("خطأ أثناء تسجيل الخروج:", error);
      });
  }, [navigate]);

  return null;
};

export default Logout;
