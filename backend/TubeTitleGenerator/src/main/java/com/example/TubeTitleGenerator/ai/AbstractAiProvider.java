package com.example.TubeTitleGenerator.ai;

import com.example.TubeTitleGenerator.dto.GenerateRequest;
import com.example.TubeTitleGenerator.dto.GenerateResponse;
import com.example.TubeTitleGenerator.dto.ThumbnailRequest;
import com.example.TubeTitleGenerator.dto.ThumbnailResponse;
import com.example.TubeTitleGenerator.service.YoutubePrompt;

public abstract class AbstractAiProvider {
    public abstract GenerateResponse generate(
            GenerateRequest request
    ) throws Exception;

    public abstract ThumbnailResponse generateThumbnail(
            ThumbnailRequest request
    ) throws Exception;

    public abstract AiProviderType getProviderType();

    protected String buildPrompt(
            GenerateRequest request) {

        return YoutubePrompt.buildTitlePrompt(
                request.getTopic(),
                request.getAudience(),
                request.getLanguage(),
                String.join(
                        ", ",
                        request.getKeywords()
                ),
                request.getTone()
        );
    }

    protected String buildThumbnailPrompt(
            ThumbnailRequest request) {

        return YoutubePrompt.buildThumbnailPrompt(
                request.getTopic(),
                request.getStyle()
        );
    }

}
