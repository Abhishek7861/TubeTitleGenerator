package com.example.TubeTitleGenerator.dto;

import com.example.TubeTitleGenerator.ai.AiProviderType;
import lombok.Data;

import java.util.List;
@Data
public class GenerateRequest {
    String topic;
    String audience;
    String language;
    List<String> keywords;
    String tone;
    AiProviderType provider;
}
