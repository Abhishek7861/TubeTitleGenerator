package com.example.TubeTitleGenerator.controller;

import com.example.TubeTitleGenerator.dto.GenerateRequest;
import com.example.TubeTitleGenerator.dto.GenerateResponse;
import com.example.TubeTitleGenerator.service.YoutubeGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @GetMapping("/me")
    public Object getCurrentUser(
            @AuthenticationPrincipal OAuth2User user) {
        return Map.of(
                "name", user.getAttribute("name"),
                "email", user.getAttribute("email"),
                "picture", user.getAttribute("picture")
        );    }
}
