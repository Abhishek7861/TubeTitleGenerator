import { useEffect, useState } from "react";

const DEFAULT_MESSAGES = [
    "Analyzing your topic...",
    "Crafting catchy titles...",
    "Writing SEO description...",
    "Picking the best tags & hashtags...",
    "Almost there — polishing results..."
];

function ResultLoader({
    messages = DEFAULT_MESSAGES,
    intervalMs = 3500,
    hint = "This usually takes 15–20 seconds."
}) {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex(i => (i + 1) % messages.length);
        }, intervalMs);
        return () => clearInterval(id);
    }, [messages, intervalMs]);

    return (
        <div className="result-loader">
            <div className="loader-spinner" />
            <div className="loader-message">{messages[index]}</div>
            {hint && <div className="loader-hint">{hint}</div>}
        </div>
    );
}

export default ResultLoader;
