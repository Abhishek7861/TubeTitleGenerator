package com.example.TubeTitleGenerator.service;

import com.example.TubeTitleGenerator.ai.AbstractAiProvider;
import com.example.TubeTitleGenerator.ai.AiProviderType;
import com.example.TubeTitleGenerator.dto.GenerateRequest;
import com.example.TubeTitleGenerator.dto.GenerateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class YoutubeGeneratorService {
    private final AiProviderFactory providerFactory;

    private final AiProviderType defaultProvider;

    public YoutubeGeneratorService(
            AiProviderFactory providerFactory,

            @Value("${ai.provider}")
            AiProviderType defaultProvider) {

        this.providerFactory =
                providerFactory;

        this.defaultProvider =
                defaultProvider;
    }

    public GenerateResponse generate(
            GenerateRequest request)
            throws Exception {

        AiProviderType providerType =
                request.getProvider() != null
                        ? request.getProvider()
                        : defaultProvider;

        AbstractAiProvider provider =
                providerFactory.getProvider(
                        providerType
                );

        return provider.generate(request);
    }
}
