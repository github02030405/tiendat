package com.tiendat.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.tiendat.backend.entity.CountProduct;
import com.tiendat.backend.entity.Gallery;
import com.tiendat.backend.entity.OrderDetail;


public interface GalleryService {
     Gallery saveImageProduct(MultipartFile file,Long prodctId) throws IOException;
    List<Gallery> getAllImages();
    Gallery getImageById(Long id);
    Gallery update(Long id,Gallery  gallery,MultipartFile file)throws IOException;
    void deletedGallery(Long id);
    
} 