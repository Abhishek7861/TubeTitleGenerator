import { useState } from "react";
import ThumbnailPreview from "./ThumbnailPreview";
import { THUMB_PRESETS, presetGradient } from "./presets";
import { downloadThumbnail } from "./downloadThumbnail";

const INITIAL_THUMB = {
    title: "10 Habits That Changed My Life",
    subtitle: "You won't believe #3",
    badge: "NEW",
    emoji: "🔥",
    textColor: "#ffffff",
    preset: 0,
    align: "left"
};

function ThumbnailGeneratorView() {

    const [thumb, setThumb] = useState(INITIAL_THUMB);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setThumb({ ...thumb, [name]: value });
    };

    const preset = THUMB_PRESETS[thumb.preset];

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

                <ThumbnailPreview thumb={thumb} preset={preset} />

                <div className="thumbnail-actions">
                    <button
                        type="button"
                        className="download-btn"
                        onClick={() => downloadThumbnail(thumb, preset)}
                    >
                        ⬇  Download 1280×720 PNG
                    </button>
                </div>
            </section>

        </div>
    );
}

export default ThumbnailGeneratorView;
