package com.tiendat.backend.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.tiendat.backend.entity.Product;
import com.tiendat.backend.repository.OrderDetailRespository;
import com.tiendat.backend.repository.ProductRespository;
import com.tiendat.backend.service.ProductService;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
  private static final String UPLOAD_DIRfe = "C:\\Users\\Admin\\Documents\\tiendat\\front-end\\public\\images\\products\\";
  private static final String UPLOAD_DIRfe_admin = "fe-admin\\public\\";

    private ProductRespository productRespository;
    @Override
    public Product createProduct(Product product,MultipartFile file) throws IOException {
      if(file.isEmpty()){
        throw new IllegalArgumentException("File không hợp lệ.");
      }
      if(file != null && !file.isEmpty()){
         byte[] bytes=file.getBytes();
         String fileName=file.getOriginalFilename();
         Path path =Paths.get(UPLOAD_DIRfe+fileName);
         Path paths =Paths.get(UPLOAD_DIRfe_admin+fileName);
         Files.write(path,bytes);
         Files.write(paths,bytes);

         product.setThumbnail(fileName);
      }
      product.setCreated_at(new Date());
       return productRespository.save(product);
    }

    @Override
    public Product getProductbyId(Long productId) {
        Optional<Product>optinalProduct=productRespository.findById(productId);
        return optinalProduct.get();
    }
    @Override
    public Product updateProduct(Product product,MultipartFile file,Long productId) throws IOException {
       Product exisProduct=productRespository.findById(productId).get();
       if (file != null && !file.isEmpty()) {
         byte[] bytes = file.getBytes();
         String fileName = file.getOriginalFilename();
         Path path =Paths.get(UPLOAD_DIRfe+fileName);
         Path paths =Paths.get(UPLOAD_DIRfe_admin+fileName);
         Files.write(path,bytes);
         Files.write(paths,bytes);
         exisProduct.setThumbnail(fileName);
     }
       exisProduct.setPrice(product.getPrice());
       exisProduct.setCreated_at(product.getCreated_at());
       exisProduct.setTitle(product.getTitle());
       exisProduct.setDiscount(product.getDiscount());
       exisProduct.setDescription(product.getDescription());
       exisProduct.setUpdate_at(product.getUpdate_at());
       exisProduct.setDeleted(product.getDeleted());
       exisProduct.setCategory(product.getCategory());
       exisProduct.setOrderDetails(product.getOrderDetails());
       return  productRespository.save(exisProduct);
    }
    @Override
    public void deleteProduct(Long productId) {
       productRespository.deleteById(productId);
    }
   @Override
   public Page<Product> getAllProduct(Pageable pageable) {
      // TODO Auto-generated method stub
      
      return productRespository.findAll(pageable);
   }

   

   @Override
   public List<Product> getLatestProductsInCategory(Long categoryId, int pageSize) {
      Pageable pageRequest =PageRequest.of(0, pageSize);
      return productRespository.findLatestProductsInCategory(categoryId, pageRequest);
   }

   @Override
   public Page<Product> getProductsByCategoryId(Long categoryId, Pageable pageable) {
      // TODO Auto-generated method stub
      return productRespository.findProductsByCategoryId(categoryId, pageable);
   }

   @Override
   public List<Product> getProductsByCondition(String title) {
    
      List<Product> products = productRespository.searchproduct(title);
      return products;
   }
}
