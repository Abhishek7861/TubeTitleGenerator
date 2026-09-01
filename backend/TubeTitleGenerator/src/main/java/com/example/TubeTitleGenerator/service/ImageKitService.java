package com.example.TubeTitleGenerator.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.imagekit.client.ImageKitClient;
import io.imagekit.models.files.FileUploadParams;
import io.imagekit.models.files.FileUploadResponse;
import org.springframework.stereotype.Service;

@Service
public class ImageKitService {
    private final ImageKitClient imageKitClient;

    public ImageKitService(ImageKitClient imageKitClient) {
        this.imageKitClient = imageKitClient;
    }

    public String uploadImage(
            byte[] imageBytes,
            String fileName
    ) throws Exception {

        FileUploadParams params =
                new FileUploadParams.Builder()
                        .file(imageBytes)
                        .fileName(fileName)
                        .folder("/youtube-thumbnails")
                        .useUniqueFileName(true)
                        .build();

        FileUploadResponse response =
                imageKitClient.files().upload(params);

        // Temporary diagnostic — remove after you know the field name
        System.out.println(
                "ImageKit upload response: "
                        + new ObjectMapper().writeValueAsString(response)
        );

        // TODO: replace this with the actual getter revealed above
        return response.toString();
    }
}
