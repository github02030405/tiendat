 package com.tiendat.backend.repository;

import  com.tiendat.backend.entity.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CategoryRespository extends JpaRepository<Category,Long>{
 
 } 