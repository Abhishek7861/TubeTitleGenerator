package com.example.TubeTitleGenerator.util;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.UUID;

public class ManageImage {
    public static String saveImageLocally(String base64Image) throws Exception {

        byte[] imageBytes = Base64.getDecoder().decode(base64Image);

        String fileName = UUID.randomUUID() + ".png";

        Path directory = Path.of("generated-images");

        Files.createDirectories(directory);

        Path filePath = directory.resolve(fileName);

        Files.write(filePath, imageBytes);

        return filePath.toAbsolutePath().toString();
    }
}
