import { Link } from "react-router-dom";
import { useEffect } from "react";
import Container from "../components/Container";
import Validator from "../utils/validator";
import "../styles/formStyle.css";

function Login() {
  useEffect(() => {
    Validator({
      formId: "#form-1",
      formMessage: ".form_message",
      formButton: "#form_button",
      formGroup: ".form_container",
      rules: [
        Validator.isRequired("#username", "Please enter your username"),
        Validator.isRequired("#password", "Please enter your password"),
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
    <div className="main">
      <form id="form-1" className="form" autoComplete="off">
        <h1 className="form_title">Login</h1>

        <Container
          name="username"
          label="Username"
          type="text"
          placeholder="Enter your username"
        ></Container>

        <Container
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        ></Container>

        <div className="form_container form_checkbox_group">
          <label htmlFor="remember" className="form_label">
            Remember me
          </label>
          <input
            type="checkbox"
            id="remember"
            name="remember"
            className="form_checkbox"
          />
        </div>

        <button id="form_button" className="form_button" type="submit">
          Login
        </button>

        <p className="form_signup">
          Need an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
