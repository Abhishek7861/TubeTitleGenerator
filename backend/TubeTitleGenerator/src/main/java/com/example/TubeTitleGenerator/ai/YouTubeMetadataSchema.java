package com.example.TubeTitleGenerator.ai;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class YouTubeMetadataSchema {
    private YouTubeMetadataSchema() {
    }

    public static Map<String, Object> build() {

        Map<String, Object> schema =
                new HashMap<>();

        schema.put("type", "object");

        Map<String, Object> properties =
                new HashMap<>();

        properties.put(
                "titles",
                Map.of(
                        "type", "array",
                        "items",
                        Map.of("type", "string")
                )
        );

        properties.put(
                "bestTitle",
                Map.of("type", "string")
        );

        properties.put(
                "description",
                Map.of("type", "string")
        );

        properties.put(
                "tags",
                Map.of(
                        "type", "array",
                        "items",
                        Map.of("type", "string")
                )
        );

        properties.put(
                "hashtags",
                Map.of(
                        "type", "array",
                        "items",
                        Map.of("type", "string")
                )
        );

        properties.put(
                "thumbnailText",
                Map.of("type", "string")
        );

        schema.put(
                "properties",
                properties
        );

        schema.put(
                "required",
                List.of(
                        "titles",
                        "bestTitle",
                        "description",
                        "tags",
                        "hashtags",
                        "thumbnailText"
                )
        );

        schema.put(
                "additionalProperties",
                false
        );

        return schema;
    }
}
