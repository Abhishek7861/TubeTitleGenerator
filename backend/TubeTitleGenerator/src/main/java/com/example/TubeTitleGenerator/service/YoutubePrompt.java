package com.example.TubeTitleGenerator.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class YoutubePrompt {
    private YoutubePrompt() {
    }

    public static String build(
            String topic,
            String audience,
            String language,
            String keywords,
            String tone) {

        return """
                You are an expert YouTube SEO strategist.

                Generate metadata for a YouTube video.

                Video topic:
                %s

                Target audience:
                %s

                Language:
                %s

                Keywords:
                %s

                Tone:
                %s

                Requirements:

                1. Generate exactly 5 compelling YouTube titles.
                2. Titles should be natural and clickable.
                3. Do not use misleading clickbait.
                4. Include the primary keyword naturally.
                5. Generate an SEO-friendly YouTube description.
                6. Generate exactly 20 relevant YouTube tags.
                7. Generate exactly 5 relevant hashtags.
                8. Generate short thumbnail text.
                9. Avoid keyword stuffing.
                10. Do not make unsupported claims.
                11. Optimize for the specified target audience.
                12. Keep the output suitable for the specified language.
                13. Return only the requested structured data.

                """.formatted(
                topic,
                audience,
                language,
                keywords,
                tone
        );
    }
}
