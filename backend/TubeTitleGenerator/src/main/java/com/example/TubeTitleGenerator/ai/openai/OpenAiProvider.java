package com.example.TubeTitleGenerator.ai.openai;

import com.example.TubeTitleGenerator.ai.AbstractAiProvider;
import com.example.TubeTitleGenerator.ai.AiProviderType;
import com.example.TubeTitleGenerator.ai.YouTubeMetadataSchema;
import com.example.TubeTitleGenerator.dto.GenerateRequest;
import com.example.TubeTitleGenerator.dto.GenerateResponse;
import com.example.TubeTitleGenerator.service.YoutubePrompt;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OpenAiProvider extends AbstractAiProvider {

    private final WebClient openAIWebClient;
    private final ObjectMapper objectMapper;

    @Value("${openai.model}")
    private String model;

    @Override
    public GenerateResponse generate(
            GenerateRequest request) throws Exception {

        String prompt = buildPrompt(request);

        Map<String, Object> body = new HashMap<>();

        body.put("model", model);
        body.put("input", prompt);

        body.put(
                "text",
                Map.of(
                        "format",
                        Map.of(
                                "type", "json_schema",
                                "name", "youtube_metadata",
                                "strict", true,
                                "schema",
                                YouTubeMetadataSchema.build()
                        )
                )
        );


        String rawResponse =
                openAIWebClient
                        .post()
                        .uri("/responses")
                        .bodyValue(body)
                        .retrieve()
                        .bodyToMono(String.class)
                        .block();


        String json =
                extractOutputText(rawResponse);

        GenerateResponse result =
                objectMapper.readValue(
                        json,
                        GenerateResponse.class
                );

        return result;
    }

    @Override
    public AiProviderType getProviderType() {
        return AiProviderType.OPENAI;
    }

    private String extractOutputText(String response) throws Exception {

        JsonNode root = objectMapper.readTree(response);

        JsonNode output = root.path("output");

        if (!output.isArray()) {
            throw new IllegalStateException(
                    "OpenAI response does not contain an output array: "
                            + response
            );
        }

        StringBuilder result = new StringBuilder();

        for (JsonNode outputItem : output) {

            // We only want assistant/message output items
            if (!"message".equals(
                    outputItem.path("type").asText())) {
                continue;
            }

            JsonNode content =
                    outputItem.path("content");

            if (!content.isArray()) {
                continue;
            }

            for (JsonNode contentItem : content) {

                if ("output_text".equals(
                        contentItem.path("type").asText())) {

                    JsonNode text =
                            contentItem.path("text");

                    if (!text.isMissingNode()
                            && !text.isNull()) {

                        result.append(
                                text.asText()
                        );
                    }
                }
            }
        }

        if (result.isEmpty()) {

            throw new IllegalStateException(
                    "OpenAI response did not contain output text. "
                            + "Raw response: "
                            + response
            );
        }
        System.out.println(result);
        return result.toString();
    }

    private Map<String, Object> buildSchema() {

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
