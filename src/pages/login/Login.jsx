import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  auth,
  googleProvider,
} from "../../utils/firebaseConfig";
import { login } from "../../utils/auth";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaTwitter } from "react-icons/fa";
import "./Login.css"; 

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      login();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to login with Google");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement email/password login logic here
    console.log("Email login submitted");
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="heading">Sign In</div>
        <form onSubmit={handleSubmit} className="form">
          <input
            required
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
          />
          <input
            required
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <span className="forgot-password">
            <a href="#">Forgot Password ?</a>
          </span>
          <input className="login-button" type="submit" value="Sign In" />
        </form>
        <div className="social-account-container">
          <span className="title">Or Sign in with</span>
          <div className="social-accounts">
            <button
              className="social-button google"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="svg" />
            </button>
            
          </div>
        </div>
        <span className="agreement">
          <a href="#">Learn user licence agreement</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
