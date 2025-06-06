function Signin() {
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
              minLength={8}
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
          <button id="form-button" className="form-button" type="submit">
            Login
          </button>
          <p className="form-signup">
            Need an account? <a href="#">SIGN UP</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signin;
