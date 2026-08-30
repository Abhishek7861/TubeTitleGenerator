package com.example.TubeTitleGenerator.service;

import com.example.TubeTitleGenerator.ai.AbstractAiProvider;
import com.example.TubeTitleGenerator.ai.AiProviderType;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AiProviderFactory {
    private final List<AbstractAiProvider> providers;

    public AiProviderFactory(List<AbstractAiProvider> providers) {
        this.providers = providers;
    }


    public AbstractAiProvider getProvider(
            AiProviderType type) {

        return providers.stream().filter(
                provider -> provider.getProviderType() == type)
                .findFirst()
                .orElseThrow(
                        () -> new IllegalArgumentException(
                                        "AI provider not configured: " + type));
    }
}
