import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import Validator from "../validator";
import "./formStyle.css";

function Signup() {
  useEffect(() => {
    // Chờ DOM được tải xong trước khi khởi tạo Validator
    Validator({
      formId: "#form-1",
      formMessage: ".form_message",
      formButton: "#form_button",
      formGroup: ".form_container",
      rules: [
        Validator.isRequired("#username", "Please enter your username"),
        Validator.isRequired("#password", "Please enter your password"),
        Validator.isRequired("#email", "Please enter your email"),
        Validator.isEmail("#email", "Please enter a valid email"),
        Validator.isPassWord(
          "#password",
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
        ),
      ],
      onSubmit: function (data) {
        console.log(data);
      },
    });
  }, []);
  return (
    <>
      <div className="main">
        <form id="form-1" className="form" autoComplete="off">
          <h1 className="form_title">Sign up</h1>
          <div className="form_container">
            <label htmlFor="username" className="form_label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form_input"
              placeholder="Enter your username"
            />
            <p className="form_message"></p>
          </div>
          <div className="form_container">
            <label htmlFor="email" className="form_label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form_input"
              placeholder="Enter your email"
            />
            <p className="form_message"></p>
          </div>
          <div className="form_container">
            <label htmlFor="password" className="form_label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form_input"
              placeholder="Enter your password"
              minLength={8}
            />
            <p className="form_message"></p>
          </div>

          <button id="form_button" className="form_button" type="submit">
            Login
          </button>
          <p className="form_signup">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
