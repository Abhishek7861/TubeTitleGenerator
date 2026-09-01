package com.example.TubeTitleGenerator.service;

import com.example.TubeTitleGenerator.ai.AbstractAiProvider;
import com.example.TubeTitleGenerator.ai.AiProviderType;
import com.example.TubeTitleGenerator.dto.GenerateRequest;
import com.example.TubeTitleGenerator.dto.GenerateResponse;
import com.example.TubeTitleGenerator.dto.ThumbnailRequest;
import com.example.TubeTitleGenerator.dto.ThumbnailResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


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

    public ThumbnailResponse generateThumbnail(
            ThumbnailRequest request) throws Exception {

        AiProviderType providerType =
                request.getProvider() != null
                        ? request.getProvider()
                        : defaultProvider;

        AbstractAiProvider provider =
                providerFactory.getProvider(
                        providerType
                );
        return provider.generateThumbnail(request);

    }
}
