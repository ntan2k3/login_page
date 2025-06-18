import { Link } from "react-router-dom";
import { useEffect } from "react";
import Container from "../components/Container";
import Validator from "../utils/validator";
import "../styles/formStyle.css";

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

          <Container
            name="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
          ></Container>

          <Container
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          ></Container>

          <Container
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          ></Container>

          <button id="form_button" className="form_button" type="submit">
            Sign up
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
