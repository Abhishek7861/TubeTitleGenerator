import "./Login.css";
import { API_URL } from "../config";

function Login() {

    const handleGoogleLogin = () => {
        window.location.href =
            `${API_URL}/oauth2/authorization/google`;
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="logo">
                    Tube Title Generator
                </div>

                <h1>
                    Grow your Youtube
                </h1>

                <p className="subtitle">
                    Grow your YT Channel with Tube Title Generator
                </p>

                <button
                    className="google-button"
                    onClick={handleGoogleLogin}
                >
                    <span className="google-icon">
                        G
                    </span>

                    Continue with Google
                </button>

                <p className="terms">
                    By continuing, you agree to our
                    Terms of Service and Privacy Policy.
                </p>

            </div>

        </div>
    );
}

export default Login;