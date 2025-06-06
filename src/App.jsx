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
      ],
    });
  }, []);
  return <Login />;
}

export default App;
