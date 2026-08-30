package com.example.TubeTitleGenerator.dto;

import java.util.List;

public record GenerateResponse(

        List<String> titles,

        String bestTitle,

        String description,

        List<String> tags,

        List<String> hashtags,

        String thumbnailText

){}