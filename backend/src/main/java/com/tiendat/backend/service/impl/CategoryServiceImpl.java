    package com.tiendat.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.tiendat.backend.entity.Category;
import com.tiendat.backend.repository.CategoryRespository;
import com.tiendat.backend.service.CategoryService;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private CategoryRespository categoryRespository;

    @Override
    public Category createCategory(Category category) {
         return categoryRespository.save(category);
    }

    @Override
    public Category getCategorybyId(Long categoryId) {
        Optional<Category>optinalCategory=categoryRespository.findById(categoryId);
        return optinalCategory.get();
    }

    @Override
    public List<Category> getAllCategories() {
       return categoryRespository.findAll();
    }

    @Override
    public Category updateCategory(Category category) {
       Category exisCategory=categoryRespository.findById(category.getId()).get();
       exisCategory.setName(category.getName());
       exisCategory.setIsHome(category.getIsHome());
       Category updateCategory=categoryRespository.save(exisCategory);
       return updateCategory;
    }

    @Override
    public void deleteCategory(Long categoryId) {
         categoryRespository.deleteById(categoryId);
    }

    
} 