import { useEffect, useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./SignIn.scss";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../../redux/action/userAction";
import { ApiLogin } from "../../../Service/ApiService";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const checkRole = useSelector(user => user.user.account.role)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const validateForm = () => {
    setIsFormValid(email && password);
  };
  const test = useSelector(state => state);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); 
        }
    }, [isAuthenticated,navigate]);

    const redirectGoogleLogin = async () => {
      setIsLoadingLogin(true);
      try {
          // Redirect to your backend to authenticate
          window.location.href = "https://learnmatebe.onrender.com/auth/google";
      } catch (error) {
          console.error('Google login error:', error);
          toast.error("An error occurred during Google login. Please try again.");
      } finally {
          setIsLoadingLogin(false);
      }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingLogin(true);
    try {
      let response = await ApiLogin(email, password);
      if (response.errorCode === 0) {
        toast.success(response.message);
        Cookies.set('accessToken', response.data.access_token, { expires: 1 });
        Cookies.set('refreshToken', response.data.refresh_token, { expires: 7 });
        await dispatch(doLogin(response));
        if(checkRole && checkRole === 'tutor') {
          navigate('/TutorHomepage');
        } 
        if(checkRole && checkRole === 'student') {
          navigate('/');
        }
      } else if (response.errorCode === 6) {
        // Email not verified
        toast.error(
          <div>
            <strong>Email chưa được xác thực!</strong><br/>
            Vui lòng kiểm tra email và click vào link xác thực trước khi đăng nhập.<br/>
            <button 
              onClick={() => handleResendVerification(email)}
              style={{marginTop: '10px', padding: '5px 10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
            >
              Gửi lại email xác thực
            </button>
          </div>,
          { autoClose: 10000 }
        );
      } else if (response.errorCode === 3) {
        toast.error(response.message);
      } else if (response.errorCode === 2) {
        toast.error("Email không tồn tại");
      } else {
        toast.error(response.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const handleResendVerification = async (email) => {
    try {
      // Call API to resend verification email
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:6060'}/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        toast.success("Email xác thực đã được gửi lại!");
      } else {
        toast.error("Không thể gửi lại email. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      toast.error("Lỗi khi gửi lại email xác thực.");
    }
  };

  return (
    <div className="signin-form-container" style={{height:'100vh'}}>
      <form className="signin-form">
        <h2>Sign In</h2>
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateForm();
            }}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateForm();
            }}
            required
          />
        </label>
        <div className="Register-body-buttonsignin">
          <button
            type="submit"
            className="btn-register btn btn-secondary"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            {isLoadingLogin && <ImSpinner9 className="loaderIcon" />}
            LOGIN
          </button>
        </div>
        <div className="separator">
          <span>or</span>
        </div>
        <button type="button" className="btn-secondary" onClick={redirectGoogleLogin}>
          <FaGoogle /> Sign in with Google
        </button>
        <button type="button" className="btn-secondary">
          <FaFacebook /> Sign in with Facebook
        </button>
        <button type="button" className="btn-secondary">
          <a onClick={()=>navigate('/forgot-password')}>Forgot password</a>
        </button>
        
        <p className="footer-text">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
