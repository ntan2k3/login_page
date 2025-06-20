import { Link } from "react-router-dom";
import { useEffect } from "react";
import Validator from "../validator";

function Signup() {
  useEffect(() => {
    // Chờ DOM được tải xong trước khi khởi tạo Validator
    Validator({
      formId: "#form-1",
      formMessage: ".form-message",
      formButton: "#form-button",
      formGroup: ".form-container",
      rules: [
        Validator.isRequired("#username", "Please enter your username"),
        Validator.isRequired("#password", "Please enter your password"),
        Validator.isPassWord(
          "#password",
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
        ),
        Validator.isRequired("#email", "Please enter your email"),
        Validator.isEmail("#email", "Please enter a valid email"),
      ],
      onSubmit: function (data) {
        console.log(data);
      },
    });
  }, []);
  return (
    <>
      <div className="main">
        <form action="" className="form" id="form-1" method="post">
          <h1 className="form-title">Sign up</h1>
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
            />
            <p className="form-message"></p>
          </div>
          <div className="form-container">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
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
              minLength={8}
            />
            <p className="form-message"></p>
          </div>

          <button id="form-button" className="form-button" type="submit">
            Login
          </button>
          <p className="form-signup">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
