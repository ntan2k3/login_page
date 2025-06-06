import "./App.css";
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
  return (
    <>
      <div className="main">
        <form action="" className="form" id="form-1" method="POST">
          <h1 className="form-title">Login</h1>
          <div className="form-container">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              placeholder="Enter your username"
              required
            />
            <p className="form-message"></p>
          </div>
          <div className="form-container">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              required
            />
            <p className="form-message"></p>
          </div>
          <div className="form-container">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="form-checkbox"
            />
            <label htmlFor="remember" className="form-label">
              Remember me
            </label>
          </div>
          <button id="form-button" className="form-button">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
