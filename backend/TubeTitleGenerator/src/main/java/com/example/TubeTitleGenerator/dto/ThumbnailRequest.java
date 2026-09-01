package com.example.TubeTitleGenerator.dto;

import com.example.TubeTitleGenerator.ai.AiProviderType;
import lombok.Data;

import java.util.List;

@Data
public class ThumbnailRequest {
    private String topic;
    private String style;
    private String text;
    private List<String> elements;
    AiProviderType provider;

}
