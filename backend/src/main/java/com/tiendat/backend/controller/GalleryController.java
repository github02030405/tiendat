package com.tiendat.backend.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tiendat.backend.entity.Gallery;
import com.tiendat.backend.entity.Product;
import com.tiendat.backend.repository.GalleryRepository;
import com.tiendat.backend.service.GalleryService;
import com.tiendat.backend.service.impl.GalleryImpl;

import jakarta.persistence.Entity;
import jakarta.persistence.criteria.Path;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
@RequestMapping(value = "api/gallery")
@CrossOrigin(origins ={"http://localhost:3000","http://localhost:3001"} ,exposedHeaders = "Content-range")
public class GalleryController {
    @Autowired
    private GalleryService galleryService;
    @PostMapping("{id}" )
    public ResponseEntity<String> uploadImage(@PathVariable("id") Long productId,@RequestParam("file") MultipartFile file) {
        try {
           galleryService.saveImageProduct(file, productId);
            return ResponseEntity.ok("Image uploaded successfully: ");
        } catch (IOException e) {
            e.printStackTrace(); // Thêm để kiểm tra lỗi chi tiết
            return ResponseEntity.status(500).body("Failed to upload image due to server error."+e.getMessage());
        } catch (IllegalArgumentException e) {
            e.printStackTrace(); // Thêm để kiểm tra lỗi chi tiết
            return ResponseEntity.badRequest().body("Invalid input: " + e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<List<Gallery>> getAllImages() {
        List<Gallery> listgallery=   galleryService.getAllImages();
        HttpHeaders headers=new HttpHeaders();
       headers.add("Content-Range","item 0"+listgallery.size()+"/"+listgallery.size());
        return ResponseEntity.ok().headers(headers).body(listgallery);
    }

    @GetMapping("{id}")
    public ResponseEntity<Gallery> getImageById(@PathVariable Long id) {
        Gallery image = galleryService.getImageById(id);
        return image != null ? ResponseEntity.ok(image) : ResponseEntity.notFound().build();
    }
    @PutMapping("{id}")
    public ResponseEntity<Gallery> putMethodName(@PathVariable("id") Long id,@RequestPart("gallery") Gallery gallery,@RequestPart(value = "file",required = false)  MultipartFile file) throws IOException {
           try {
            Gallery update=galleryService.update(id, gallery, file);
            return new ResponseEntity<>(update,HttpStatus.OK);
    } catch (Exception e) {
        return ResponseEntity.status(500).body(null);
    }
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleted(@PathVariable Long id) {
            galleryService.deletedGallery(id);
         return new ResponseEntity<>("da xoa thanh",HttpStatus.OK);
    }
}   