import "./App.css";
import Login from "./components/Login.jsx";
import Validator from "./validator.js";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    // Chờ DOM được tải xong trước khi khởi tạo Validator
    Validator({
      formId: "#form-1",
      formMessage: ".form-message",
      formButton: "#form-button",
      rules: [
        Validator.isRequired("#username", "Please enter your username"),
        Validator.isRequired("#password", "Please enter your password"),
        Validator.isPassWord(
          "#password",
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
        ),
      ],
    });
  }, []);
  return <Login />;
}

export default App;
