export const THUMB_PRESETS = [
    { name: "Sunset", from: "#f97316", to: "#db2777" },
    { name: "Ocean",  from: "#0ea5e9", to: "#6366f1" },
    { name: "Forest", from: "#10b981", to: "#064e3b" },
    { name: "Mono",   from: "#1f2937", to: "#0f172a" },
    { name: "Cyber",  from: "#7c3aed", to: "#ec4899" },
    { name: "Gold",   from: "#f59e0b", to: "#b45309" }
];

export function presetGradient(p) {
    return `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)`;
}
