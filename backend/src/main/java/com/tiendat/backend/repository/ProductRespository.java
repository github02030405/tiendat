package com.tiendat.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
    
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tiendat.backend.entity.Product;

public interface ProductRespository extends JpaRepository<Product,Long> {
    @Query("SELECT p FROM Product p WHERE p.category.id =:categoryId ORDER BY p.created_at DESC")
    List<Product>findLatestProductsInCategory(Long categoryId,Pageable pageable);
    Page<Product> findProductsByCategoryId(Long categoryId, Pageable pageable);
    @Query("SELECT p FROM Product p WHERE  p.title LIKE %:productitle%" )
    List<Product>searchproduct(String productitle);
    @Query("SELECT p FROM Product p WHERE  p.id =:productId " )
    Product findonebyId(Long productId);
    @Query("SELECT p FROM Product p  ORDER BY p.created_at DESC LIMIT 7")
    List<Product>productnew();
}
