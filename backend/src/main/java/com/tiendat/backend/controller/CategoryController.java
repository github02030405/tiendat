    package com.tiendat.backend.controller;
    import java.util.List;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.CrossOrigin;
    import org.springframework.web.bind.annotation.DeleteMapping;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RequestBody;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;
    import com.tiendat.backend.entity.Category;
    import com.tiendat.backend.service.CategoryService;
    import lombok.AllArgsConstructor;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.PutMapping;
    import org.springframework.http.HttpHeaders;
    @RestController
    @AllArgsConstructor
    @RequestMapping(value = "api/categories")
    @CrossOrigin(origins ={"http://localhost:3000","http://localhost:3001"},exposedHeaders = "Content-range")
    public class CategoryController {
        private CategoryService categoryService;
        @PostMapping
        public ResponseEntity<Category>createCategory(@RequestBody Category category){
            Category savedCategory=categoryService.createCategory(category);
            return new ResponseEntity<>(savedCategory,HttpStatus.CREATED);
        }
        @GetMapping("{id}")
        public ResponseEntity<Category>getCategoryId(@PathVariable("id") Long categoryId){
            Category getCategory=categoryService.getCategorybyId(categoryId);
            return new ResponseEntity<>(getCategory,HttpStatus.OK);
        }
        @GetMapping
        public ResponseEntity<List<Category>>getAllCategory(){
        List<Category>getCategory=categoryService.getAllCategories();
        HttpHeaders headers=new HttpHeaders();
        headers.add("Content-Range","item 0"+getCategory.size()+"/"+getCategory.size());
            return ResponseEntity.ok().headers(headers).body(getCategory);
        }
        @PutMapping("{id}")
        public ResponseEntity<Category>updateCategory(@PathVariable("id") Long categoryId,@RequestBody Category category){
            
            category.setId(categoryId);
            Category upCategory=categoryService.updateCategory(category);
            return new ResponseEntity<>(upCategory,HttpStatus.OK);
        }
        @DeleteMapping("{id}")
        public ResponseEntity<String>deletca(@PathVariable("id") Long categoryId){
            categoryService.deleteCategory(categoryId);
            return new ResponseEntity<>("category successfully deleted",HttpStatus.OK);
        }

    }
