export const LANGUAGES = [
    "English", "Hindi", "Spanish", "French",
    "German", "Portuguese", "Japanese"
];

export const TONES = [
    "Engaging", "Professional", "Casual",
    "Funny", "Dramatic", "Educational"
];

export const PROVIDERS = [
    { value: "OPENAI", label: "OpenAI" },
    { value: "GEMINI", label: "Gemini" }
];

export const INITIAL_FORM = {
    topic: "",
    audience: "",
    language: "English",
    keywords: "",
    tone: "Engaging",
    provider: "OPENAI"
};
