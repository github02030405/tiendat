
package com.tiendat.backend.service;
 
import java.util.List;

import com.tiendat.backend.entity.Category;

public interface CategoryService {
    public Category createCategory(Category category);
    public Category getCategorybyId(Long categoryId);
    public List<Category>getAllCategories();
    public Category updateCategory(Category category);
    public void deleteCategory(Long categoryId);
}