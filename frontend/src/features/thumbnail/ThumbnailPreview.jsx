import { presetGradient } from "./presets";

function ThumbnailPreview({ thumb, preset }) {
    return (
        <div
            className={"thumbnail-preview align-" + thumb.align}
            style={{
                background: presetGradient(preset),
                color: thumb.textColor
            }}
        >
            {thumb.badge && (
                <span className="thumb-badge">{thumb.badge}</span>
            )}

            <div className="thumb-content">
                {thumb.emoji && (
                    <div className="thumb-emoji">{thumb.emoji}</div>
                )}
                <div className="thumb-title">{thumb.title}</div>
                {thumb.subtitle && (
                    <div className="thumb-subtitle">{thumb.subtitle}</div>
                )}
            </div>
        </div>
    );
}

export default ThumbnailPreview;
