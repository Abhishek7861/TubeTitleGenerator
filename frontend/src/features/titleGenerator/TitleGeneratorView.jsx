import { useState } from "react";
import { generateTitles } from "../../api/endpoints";
import ResultLoader from "../../components/ResultLoader";
import TitleResults from "./TitleResults";
import { INITIAL_FORM, LANGUAGES, TONES, PROVIDERS } from "./constants";

function TitleGeneratorView() {

    const [form, setForm] = useState(INITIAL_FORM);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
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
            ...form,
            keywords: form.keywords
                .split(",")
                .map(k => k.trim())
                .filter(Boolean)
        };

        try {
            const data = await generateTitles(payload);
            setResult(data);
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
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
                                {LANGUAGES.map(l => (
                                    <option key={l}>{l}</option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Tone
                            <select
                                name="tone"
                                value={form.tone}
                                onChange={handleChange}
                            >
                                {TONES.map(t => (
                                    <option key={t}>{t}</option>
                                ))}
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
                            {PROVIDERS.map(p => (
                                <option key={p.value} value={p.value}>
                                    {p.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    {error && <div className="error">{error}</div>}

                    <button type="submit" disabled={loading}>
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
                        Fill in the details and click Generate
                        to see suggestions here.
                    </p>
                )}

                {loading && <ResultLoader />}

                {result && <TitleResults result={result} />}
            </section>

        </div>
    );
}

export default TitleGeneratorView;
