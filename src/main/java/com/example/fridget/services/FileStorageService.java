package com.example.fridget.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    private final String uploadDir = "uploads/";

    public String saveFile(MultipartFile file, String subDir) throws IOException {
        // Ensure the subdirectory exists
        Path subDirPath = Paths.get(uploadDir + subDir);
        if (!Files.exists(subDirPath)) {
            Files.createDirectories(subDirPath);
            System.out.println("Created directory: " + subDirPath.toAbsolutePath());
        }

        // Retrieve the original filename
        String originalFilename = file.getOriginalFilename();
        System.out.println("Original Filename: " + originalFilename);

        // Determine the file extension
        String fileExtension;
        if (originalFilename == null || !originalFilename.contains(".")) {
            System.out.println("No valid file extension found. Using content type.");
            fileExtension = getFileExtensionFromContentType(file.getContentType());
        } else {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        System.out.println("Determined file extension: " + fileExtension);

        // Validate the file extension
        if (!fileExtension.matches("\\.(jpg|jpeg|png|gif)")) {
            throw new IllegalArgumentException("Unsupported file type: " + fileExtension);
        }

        // Generate a unique filename
        String uniqueFileName = UUID.randomUUID() + fileExtension;

        // Prepare the file path
        Path filePath = subDirPath.resolve(uniqueFileName);
        System.out.println("Attempting to save file to: " + filePath.toAbsolutePath());

        // Read and save the image file
        BufferedImage image = ImageIO.read(file.getInputStream());
        if (image == null) {
            throw new IOException("Invalid image file. Could not read the image.");
        }

        File outputFile = filePath.toFile();
        boolean isWritten = ImageIO.write(image, fileExtension.replace(".", ""), outputFile);
        if (!isWritten) {
            throw new IOException("Failed to write image file: Unsupported format or invalid image.");
        }

        System.out.println("File successfully written to: " + outputFile.getAbsolutePath());

        // Return the relative path
        return subDir + "/" + uniqueFileName;
    }

    // Helper method to determine file extension from content type
    private String getFileExtensionFromContentType(String contentType) {
        System.out.println("Content-Type: " + contentType);
        if (contentType == null) return ".jpg"; // Default to .jpg
        switch (contentType) {
            case "image/jpeg":
                return ".jpg";
            case "image/png":
                return ".png";
            case "image/gif":
                return ".gif";
            default:
                return ".jpg"; // Default to .jpg if type is unknown
        }
    }

    public void deleteFile(String filePath) {
        try {
            Path path = Paths.get(uploadDir).resolve(filePath).normalize();
            Files.deleteIfExists(path);
        } catch (IOException e) {
            System.err.println("Error deleting file: " + e.getMessage());
        }
    }


}
