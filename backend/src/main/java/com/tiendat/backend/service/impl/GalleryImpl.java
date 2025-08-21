package com.tiendat.backend.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.tiendat.backend.entity.Category;
import com.tiendat.backend.entity.CountProduct;
import com.tiendat.backend.entity.Gallery;
import com.tiendat.backend.entity.OrderDetail;
import com.tiendat.backend.entity.Product;
import com.tiendat.backend.entity.User;
import com.tiendat.backend.repository.GalleryRepository;
import com.tiendat.backend.repository.ProductRespository;
import com.tiendat.backend.service.GalleryService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
@AllArgsConstructor
@Service
public class GalleryImpl implements GalleryService {
    private static final String UPLOAD_fe_admin = "fe-admin\\public\\";
    private static final String UPLOAD_DIRfe = "C:\\Users\\Admin\\Documents\\tiendat\\front-end\\public\\images\\gallery\\";
    @Autowired
    private ProductRespository productRespository;
    private GalleryRepository galleryRepository;
    @Override
    public Gallery saveImageProduct(MultipartFile file, Long productId) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File không hợp lệ.");
        }
       List<CountProduct>totalProduct= galleryRepository.totalProductId();
       for (CountProduct countProduct : totalProduct) {
            if(countProduct.getProductId()==productId && countProduct.getCount()>=4 ){
                throw new IllegalArgumentException("số lượng gallery chỉ được 4");
            }
       }
      Optional<Product> productOpt= productRespository.findById(productId);
      Product product = productOpt.orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Product."));
        byte[] bytes = file.getBytes();
        String fileName = file.getOriginalFilename();
        Path path=Paths.get(UPLOAD_fe_admin +fileName );
        Path paths=Paths.get(UPLOAD_DIRfe +fileName );
        Files.write(path, bytes);
        Files.write(paths, bytes);
        Gallery image = new Gallery();
        image.setName(fileName);
        image.setImageData(bytes);
        image.setProduct(product);
        return galleryRepository.save(image);
    }
    @Override
    public List<Gallery> getAllImages() {
        return galleryRepository.findallgallery();
    }
    @Override
    public Gallery getImageById(Long id) {
        return galleryRepository.findById(id).orElse(null);
    }
    @Override
    public Gallery update(Long id ,Gallery gallery,MultipartFile file) throws IOException{
        Gallery exisgallery=galleryRepository.findById(id).get();
        if (file != null && !file.isEmpty()) {
            byte[] bytes = file.getBytes();
            String fileName = file.getOriginalFilename();
            Path path =Paths.get(UPLOAD_DIRfe+fileName);
            Path paths =Paths.get(UPLOAD_fe_admin+fileName);
            Files.write(path,bytes);
            Files.write(paths,bytes);
            exisgallery.setName(fileName);
            exisgallery.setImageData(bytes);
        }
        exisgallery.setProduct(gallery.getProduct());
        return galleryRepository.save(exisgallery);
    }
    @Override
    public void deletedGallery(Long id) {
        galleryRepository.deleteById(id);
    }
}
