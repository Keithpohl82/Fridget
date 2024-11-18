package com.example.fridget.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class FileController {

    private final String uploadDir = "uploads/";

    @GetMapping("/{subDir}/{filename}")
    public ResponseEntity<byte[]> getFile(@PathVariable String subDir, @PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir + subDir + "/" + filename);

            if (!Files.exists(filePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            byte[] fileContent = Files.readAllBytes(filePath);
            String contentType = Files.probeContentType(filePath);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, contentType)
                    .body(fileContent);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

