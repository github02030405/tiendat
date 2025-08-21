package com.tiendat.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tiendat.backend.entity.CountProduct;
import com.tiendat.backend.entity.Gallery;
public interface GalleryRepository extends JpaRepository<Gallery,Long> {
    @Query("SELECT p FROM Gallery p  ORDER BY p.product.id DESC")
    List<Gallery>findallgallery();
    @Query("SELECT new com.tiendat.backend.entity.CountProduct(p.product.id, COUNT(p)) FROM Gallery p GROUP BY p.product.id")
    List<CountProduct>  totalProductId();
}   