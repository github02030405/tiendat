package com.tiendat.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.tiendat.backend.entity.Product;

public interface ProductService {


    public Product createProduct(Product product,MultipartFile file)throws IOException;
    public Product getProductbyId(Long id);
    public Page<Product>getAllProduct(Pageable pageable);
    public Product updateProduct(Product product,MultipartFile file,Long ProductId)throws IOException;
    public void deleteProduct(Long productId);
    public List<Product>getProductsByCondition(String title);
    public List<Product>getLatestProductsInCategory(Long categoryId,int pageSize);
    public Page<Product> getProductsByCategoryId(Long categoryId, Pageable pageable);
  
}
