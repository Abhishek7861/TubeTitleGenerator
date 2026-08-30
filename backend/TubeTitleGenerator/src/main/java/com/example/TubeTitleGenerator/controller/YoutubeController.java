package com.example.TubeTitleGenerator.controller;

import com.example.TubeTitleGenerator.dto.GenerateRequest;
import com.example.TubeTitleGenerator.dto.GenerateResponse;
import com.example.TubeTitleGenerator.service.YoutubeGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class YoutubeController {
    private final YoutubeGeneratorService service;

    @PostMapping("/generate")
    public GenerateResponse generate(
            @RequestBody GenerateRequest request)
            throws Exception {

        return service.generate(request);
    }
}
