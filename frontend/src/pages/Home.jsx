import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

    const navigate = useNavigate();

    return (
        <div className="home-page">

            <div className="home-card">

                <div className="home-logo">
                    <span className="home-mark">▶</span>
                    Tube Title Generator
                </div>

                <h1 className="home-title">
                    Grow your YouTube channel
                    with AI-powered titles.
                </h1>

                <p className="home-subtitle">
                    Generate click-worthy titles, SEO
                    descriptions, tags, hashtags, and
                    thumbnails in seconds.
                </p>

                <button
                    className="home-login-btn"
                    onClick={() => navigate("/login")}
                >
                    Login to get started
                </button>

                <div className="home-features">
                    <div className="home-feature">
                        <span className="home-feature-icon">✍️</span>
                        Titles & descriptions
                    </div>
                    <div className="home-feature">
                        <span className="home-feature-icon">🏷️</span>
                        Tags & hashtags
                    </div>
                    <div className="home-feature">
                        <span className="home-feature-icon">🖼️</span>
                        Thumbnail studio
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Home;
