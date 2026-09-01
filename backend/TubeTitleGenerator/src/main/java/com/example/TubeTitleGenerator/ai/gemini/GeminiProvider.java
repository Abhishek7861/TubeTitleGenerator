package com.example.TubeTitleGenerator.ai.gemini;

import com.example.TubeTitleGenerator.ai.AbstractAiProvider;
import com.example.TubeTitleGenerator.ai.AiProviderType;
import com.example.TubeTitleGenerator.dto.GenerateRequest;
import com.example.TubeTitleGenerator.dto.GenerateResponse;
import com.example.TubeTitleGenerator.dto.ThumbnailRequest;
import com.example.TubeTitleGenerator.dto.ThumbnailResponse;
import com.example.TubeTitleGenerator.service.YoutubePrompt;
import com.google.genai.Client;
import com.google.genai.gaos.models.interactions.CreateModelInteraction;
import com.google.genai.gaos.models.interactions.Interaction;
import com.google.genai.gaos.models.interactions.InteractionsInput;
import com.google.genai.gaos.models.interactions.Model;
import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

@Component
public class GeminiProvider extends AbstractAiProvider {

    private final Client client;
    private final String model;
    private final ObjectMapper objectMapper;

    public GeminiProvider(
            @Value("${gemini.api-key}")
            String apiKey,

            @Value("${gemini.model}")
            String model,
            ObjectMapper objectMapper) {
        this.client = Client.builder().apiKey(apiKey).build();
        this.model = model;
        this.objectMapper = objectMapper;
    }

    @Override
    public GenerateResponse generate(GenerateRequest request) throws Exception {
        String prompt =
                YoutubePrompt.buildTitlePrompt(
                        request.getTopic(),
                        request.getAudience(),
                        request.getLanguage(),
                        String.join(
                                ", ",
                                request.getKeywords()
                        ),
                        request.getTone()
                );
        CreateModelInteraction params =
                CreateModelInteraction.builder()
                        .model(Model.of(model))
                        .input(InteractionsInput.of(prompt))
                        .build();

        Interaction interaction =
                client.interactions
                        .create(CreateInteractionRequestBody.of(params))
                        .interaction()
                        .get();

        String json =
                interaction
                        .outputText()
                        .orElseThrow(() -> new IllegalStateException(
                                        "Gemini returned empty output"));

        return parseResponse(json);
    }

    @Override
    public ThumbnailResponse generateThumbnail(ThumbnailRequest request) throws Exception {
        return null;
    }

    @Override
    public AiProviderType getProviderType() {
        return AiProviderType.GEMINI;
    }

    private GenerateResponse parseResponse(
            String json)
            throws Exception {

        // We'll use ObjectMapper here.
        return objectMapper.readValue(json,GenerateResponse.class);
    }
}
