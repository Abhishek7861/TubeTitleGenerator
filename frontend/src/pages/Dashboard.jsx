import { useEffect, useState } from "react";
import "./Dashboard.css";
import { API_URL } from "../config";

function Dashboard() {

    const [user, setUser] = useState(null);
    const [activeView, setActiveView] = useState("title");

    const handleLogout = async () => {

        try {

            await fetch(`${API_URL}/logout`, {
                method: "POST",
                credentials: "include"
            });

        } catch (error) {

            console.error("Logout failed:", error);

        } finally {

            window.location.href = "/login";
        }
    };

    useEffect(() => {

        fetch(`${API_URL}/api/me`, {
            credentials: "include"
        })
            .then(response => {

                if (!response.ok) {
                    throw new Error("Not authenticated");
                }

                return response.json();
            })
            .then(data => {
                setUser(data);
            })
            .catch(() => {

                window.location.href =
                    "/login";
            });

    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    const viewMeta = {
        title: {
            eyebrow: "Title & Description",
            tagline:
                "Generate catchy YouTube titles, descriptions, and tags in seconds."
        },
        thumbnail: {
            eyebrow: "Thumbnail Studio",
            tagline:
                "Compose click-worthy thumbnails with a live 16:9 preview."
        }
    };

    return (
        <div className="dashboard">

            <aside className="sidebar">

                <div className="brand">
                    <span className="brand-mark">▶</span>
                    Tube Title Generator
                </div>

                <nav className="sidebar-nav">
                    <a
                        className={activeView === "title" ? "active" : ""}
                        onClick={() => setActiveView("title")}
                    >
                        <span className="nav-icon">✍️</span>
                        YouTube Title & Desc
                    </a>
                    <a
                        className={activeView === "thumbnail" ? "active" : ""}
                        onClick={() => setActiveView("thumbnail")}
                    >
                        <span className="nav-icon">🖼️</span>
                        Thumbnail Generator
                    </a>
                </nav>

                <div className="sidebar-profile">
                    <img
                        className="sidebar-avatar"
                        src={user.picture}
                        alt={user.name}
                        referrerPolicy="no-referrer"
                    />
                    <div className="sidebar-user">
                        <div className="sidebar-name">
                            {user.name}
                        </div>
                        <div className="sidebar-email">
                            {user.email}
                        </div>
                    </div>
                </div>

                <div className="logout" onClick={handleLogout}>
                    Logout
                </div>

            </aside>

            <main className="main">

                <header className="header">

                    <div className="hero">
                        <span className="hero-eyebrow">
                            {viewMeta[activeView].eyebrow}
                        </span>
                        <h1>
                            Welcome back, {user.name.split(" ")[0]}
                        </h1>
                        <p>
                            {viewMeta[activeView].tagline}
                        </p>
                    </div>

                    <div className="user-chip">
                        <img
                            className="profile-image"
                            src={user.picture}
                            alt={user.name}
                            referrerPolicy="no-referrer"
                        />
                        <div className="user-chip-text">
                            <span className="user-chip-name">
                                {user.name}
                            </span>
                            <span className="user-chip-email">
                                {user.email}
                            </span>
                        </div>
                    </div>

                </header>

                {activeView === "title" && <TitleGeneratorView />}
                {activeView === "thumbnail" && <ThumbnailGeneratorView />}

            </main>

        </div>
    );
}

/* ---------- Result Loader ---------- */

const LOADER_MESSAGES = [
    "Analyzing your topic...",
    "Crafting catchy titles...",
    "Writing SEO description...",
    "Picking the best tags & hashtags...",
    "Almost there — polishing results..."
];

function ResultLoader() {

    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setMessageIndex((i) => (i + 1) % LOADER_MESSAGES.length);
        }, 3500);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="result-loader">
            <div className="loader-spinner" />
            <div className="loader-message">
                {LOADER_MESSAGES[messageIndex]}
            </div>
            <div className="loader-hint">
                This usually takes 15–20 seconds.
            </div>
        </div>
    );
}

/* ---------- Title & Description Generator ---------- */

function TitleGeneratorView() {

    const [form, setForm] = useState({
        topic: "",
        audience: "",
        language: "English",
        keywords: "",
        tone: "Engaging",
        provider: "OPENAI"
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleGenerate = async (e) => {
        e.preventDefault();

        if (!form.topic.trim()) {
            setError("Please enter a topic.");
            return;
        }

        setError("");
        setLoading(true);
        setResult(null);

        const payload = {
            topic: form.topic,
            audience: form.audience,
            language: form.language,
            tone: form.tone,
            provider: form.provider,
            keywords: form.keywords
                .split(",")
                .map(k => k.trim())
                .filter(Boolean)
        };

        try {

            const response = await fetch(
                `${API_URL}/api/generate`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                throw new Error("Generation failed");
            }

            const data = await response.json();
            setResult(data);

        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="generator-grid">

            <section className="form-card">

                <h2>Video details</h2>

                <form onSubmit={handleGenerate}>

                    <label>
                        Topic
                        <input
                            type="text"
                            name="topic"
                            value={form.topic}
                            onChange={handleChange}
                            placeholder="e.g. How to bake sourdough bread"
                        />
                    </label>

                    <label>
                        Target audience
                        <input
                            type="text"
                            name="audience"
                            value={form.audience}
                            onChange={handleChange}
                            placeholder="e.g. Home bakers, beginners"
                        />
                    </label>

                    <div className="row">

                        <label>
                            Language
                            <select
                                name="language"
                                value={form.language}
                                onChange={handleChange}
                            >
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Spanish</option>
                                <option>French</option>
                                <option>German</option>
                                <option>Portuguese</option>
                                <option>Japanese</option>
                            </select>
                        </label>

                        <label>
                            Tone
                            <select
                                name="tone"
                                value={form.tone}
                                onChange={handleChange}
                            >
                                <option>Engaging</option>
                                <option>Professional</option>
                                <option>Casual</option>
                                <option>Funny</option>
                                <option>Dramatic</option>
                                <option>Educational</option>
                            </select>
                        </label>

                    </div>

                    <label>
                        Keywords (comma separated)
                        <input
                            type="text"
                            name="keywords"
                            value={form.keywords}
                            onChange={handleChange}
                            placeholder="bread, sourdough, recipe"
                        />
                    </label>

                    <label>
                        AI provider
                        <select
                            name="provider"
                            value={form.provider}
                            onChange={handleChange}
                        >
                            <option value="OPENAI">OpenAI</option>
                            <option value="GEMINI">Gemini</option>
                        </select>
                    </label>

                    {error && (
                        <div className="error">{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="btn-spinner" />
                                Generating...
                            </>
                        ) : (
                            "Generate"
                        )}
                    </button>

                </form>

            </section>

            <section className="result-card">

                <h2>Results</h2>

                {!result && !loading && (
                    <p className="empty">
                        Fill in the details and click
                        Generate to see suggestions here.
                    </p>
                )}

                {loading && <ResultLoader />}

                {result && (
                    <div className="results">

                        <div className="result-block">
                            <h3>Best title</h3>
                            <div className="best-title">
                                <span>{result.bestTitle}</span>
                                <button
                                    onClick={() =>
                                        copyToClipboard(result.bestTitle)
                                    }
                                >
                                    Copy
                                </button>
                            </div>
                        </div>

                        <div className="result-block">
                            <h3>All titles</h3>
                            <ul className="title-list">
                                {result.titles?.map((t, i) => (
                                    <li key={i}>
                                        <span>{t}</span>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(t)
                                            }
                                        >
                                            Copy
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="result-block">
                            <h3>Description</h3>
                            <p className="description">
                                {result.description}
                            </p>
                        </div>

                        <div className="result-block">
                            <h3>Tags</h3>
                            <div className="chips">
                                {result.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="chip"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="result-block">
                            <h3>Hashtags</h3>
                            <div className="chips">
                                {result.hashtags?.map((h, i) => (
                                    <span
                                        key={i}
                                        className="chip hashtag"
                                    >
                                        {h}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {result.thumbnailText && (
                            <div className="result-block">
                                <h3>Thumbnail text</h3>
                                <p className="thumbnail-text">
                                    {result.thumbnailText}
                                </p>
                            </div>
                        )}

                    </div>
                )}

            </section>

        </div>
    );
}

/* ---------- Thumbnail Generator ---------- */

const THUMB_PRESETS = [
    { name: "Sunset", from: "#f97316", to: "#db2777" },
    { name: "Ocean",  from: "#0ea5e9", to: "#6366f1" },
    { name: "Forest", from: "#10b981", to: "#064e3b" },
    { name: "Mono",   from: "#1f2937", to: "#0f172a" },
    { name: "Cyber",  from: "#7c3aed", to: "#ec4899" },
    { name: "Gold",   from: "#f59e0b", to: "#b45309" }
];

function presetGradient(p) {
    return `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)`;
}

function wrapText(ctx, text, maxWidth) {
    const words = text.split(/\s+/);
    const lines = [];
    let line = "";
    for (const word of words) {
        const test = line ? line + " " + word : word;
        if (ctx.measureText(test).width > maxWidth && line) {
            lines.push(line);
            line = word;
        } else {
            line = test;
        }
    }
    if (line) lines.push(line);
    return lines;
}

function ThumbnailGeneratorView() {

    const [thumb, setThumb] = useState({
        title: "10 Habits That Changed My Life",
        subtitle: "You won't believe #3",
        badge: "NEW",
        emoji: "🔥",
        textColor: "#ffffff",
        preset: 0,
        align: "left"
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setThumb({
            ...thumb,
            [name]: type === "number" ? Number(value) : value
        });
    };

    const preset = THUMB_PRESETS[thumb.preset];

    const downloadThumbnail = () => {
        const W = 1280;
        const H = 720;
        const pad = 60;

        const canvas = document.createElement("canvas");
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext("2d");

        // Background gradient (135deg = top-left to bottom-right)
        const bg = ctx.createLinearGradient(0, 0, W, H);
        bg.addColorStop(0, preset.from);
        bg.addColorStop(1, preset.to);
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        // Text alignment
        const align = thumb.align;
        let anchorX;
        if (align === "left") anchorX = pad;
        else if (align === "right") anchorX = W - pad;
        else anchorX = W / 2;

        // Measure title lines
        ctx.textAlign = align;
        ctx.fillStyle = thumb.textColor;

        const titleFont =
            '900 96px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        const subFont =
            '600 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        const emojiFont = "80px sans-serif";
        const maxTextWidth = W - pad * 2;

        ctx.font = titleFont;
        const titleLines = wrapText(ctx, thumb.title || "", maxTextWidth);
        const titleLineHeight = 104;
        const titleBlockH = titleLines.length * titleLineHeight;

        const emojiH = thumb.emoji ? 96 : 0;
        const subH = thumb.subtitle ? 48 : 0;
        const gap = 16;

        const totalH =
            emojiH +
            (thumb.emoji ? gap : 0) +
            titleBlockH +
            (thumb.subtitle ? gap + subH : 0);

        let y = (H - totalH) / 2;

        // Text shadow for legibility
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = 16;
        ctx.shadowOffsetY = 3;

        // Emoji
        if (thumb.emoji) {
            ctx.font = emojiFont;
            ctx.textBaseline = "top";
            ctx.fillText(thumb.emoji, anchorX, y);
            y += emojiH + gap;
        }

        // Title
        ctx.font = titleFont;
        ctx.textBaseline = "top";
        ctx.fillStyle = thumb.textColor;
        for (const line of titleLines) {
            ctx.fillText(line, anchorX, y);
            y += titleLineHeight;
        }

        // Subtitle
        if (thumb.subtitle) {
            y += gap - (titleLineHeight - 96);
            ctx.font = subFont;
            ctx.globalAlpha = 0.9;
            ctx.fillText(thumb.subtitle, anchorX, y);
            ctx.globalAlpha = 1;
        }

        // Badge (top-right, drawn last so it sits on top, no shadow)
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        if (thumb.badge) {
            const bText = thumb.badge;
            ctx.font =
                'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            const padX = 20;
            const padY = 12;
            const tw = ctx.measureText(bText).width;
            const bw = tw + padX * 2;
            const bh = 28 + padY * 2;
            const bx = W - bw - 40;
            const by = 40;

            ctx.fillStyle = "#ef4444";
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(bx, by, bw, bh, 10);
            } else {
                ctx.rect(bx, by, bw, bh);
            }
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(bText, bx + bw / 2, by + bh / 2 + 1);
        }

        // Trigger download
        const link = document.createElement("a");
        link.download = `thumbnail-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="generator-grid">

            <section className="form-card">

                <h2>Thumbnail details</h2>

                <form onSubmit={(e) => e.preventDefault()}>

                    <label>
                        Headline text
                        <input
                            type="text"
                            name="title"
                            value={thumb.title}
                            onChange={handleChange}
                            placeholder="Big attention-grabbing line"
                        />
                    </label>

                    <label>
                        Subtitle
                        <input
                            type="text"
                            name="subtitle"
                            value={thumb.subtitle}
                            onChange={handleChange}
                            placeholder="Optional supporting text"
                        />
                    </label>

                    <div className="row">

                        <label>
                            Badge
                            <input
                                type="text"
                                name="badge"
                                value={thumb.badge}
                                onChange={handleChange}
                                placeholder="NEW / EP 12"
                                maxLength={8}
                            />
                        </label>

                        <label>
                            Emoji
                            <input
                                type="text"
                                name="emoji"
                                value={thumb.emoji}
                                onChange={handleChange}
                                placeholder="🔥"
                                maxLength={3}
                            />
                        </label>

                    </div>

                    <div className="row">

                        <label>
                            Text color
                            <input
                                type="color"
                                name="textColor"
                                value={thumb.textColor}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Alignment
                            <select
                                name="align"
                                value={thumb.align}
                                onChange={handleChange}
                            >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                            </select>
                        </label>

                    </div>

                    <label>
                        Background preset
                        <div className="preset-grid">
                            {THUMB_PRESETS.map((p, i) => (
                                <button
                                    key={p.name}
                                    type="button"
                                    className={
                                        "preset-swatch" +
                                        (thumb.preset === i ? " selected" : "")
                                    }
                                    style={{ background: presetGradient(p) }}
                                    onClick={() =>
                                        setThumb({ ...thumb, preset: i })
                                    }
                                    title={p.name}
                                />
                            ))}
                        </div>
                    </label>

                </form>

            </section>

            <section className="result-card">

                <h2>Live preview</h2>

                <div
                    className={"thumbnail-preview align-" + thumb.align}
                    style={{
                        background: presetGradient(preset),
                        color: thumb.textColor
                    }}
                >
                    {thumb.badge && (
                        <span className="thumb-badge">
                            {thumb.badge}
                        </span>
                    )}

                    <div className="thumb-content">
                        {thumb.emoji && (
                            <div className="thumb-emoji">
                                {thumb.emoji}
                            </div>
                        )}
                        <div className="thumb-title">
                            {thumb.title}
                        </div>
                        {thumb.subtitle && (
                            <div className="thumb-subtitle">
                                {thumb.subtitle}
                            </div>
                        )}
                    </div>
                </div>

                <div className="thumbnail-actions">
                    <button
                        type="button"
                        className="download-btn"
                        onClick={downloadThumbnail}
                    >
                        ⬇  Download 1280×720 PNG
                    </button>
                </div>

            </section>

        </div>
    );
}

export default Dashboard;
