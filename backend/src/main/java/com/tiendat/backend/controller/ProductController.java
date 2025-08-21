package com.tiendat.backend.controller;



import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.condition.ProducesRequestCondition;

import com.tiendat.backend.entity.Product;
import com.tiendat.backend.repository.ProductRespository;
import com.tiendat.backend.service.ProductService;
import org.springframework.web.bind.annotation.RequestMethod;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PutMapping;
@RestController
@RequestMapping("api/product")
@AllArgsConstructor
@CrossOrigin(origins ={"http://localhost:3000","http://localhost:3001"},
allowCredentials = "true", 
             allowedHeaders = "*", 
             exposedHeaders = "Content-range", 
              methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ProductController {
    private ProductRespository productRespository;
    private ProductService productService;
@PostMapping
public ResponseEntity<Product> createProduct(@RequestPart("product") Product product,@RequestPart("file")  MultipartFile file) throws IOException {
    Product createProduct=productService.createProduct(product, file);
    return new ResponseEntity<>(createProduct,HttpStatus.CREATED);
}
@GetMapping("{id}")
public ResponseEntity<Product> getProductbyId(@PathVariable("id") Long productId) {
    Product getProduct=productService.getProductbyId(productId);
    return new ResponseEntity<>(getProduct,HttpStatus.OK);
}
@GetMapping("search")
public  ResponseEntity<List<Product>> searchProducts(
    @RequestParam("title") String title)
    {
    List<Product>products= productService.getProductsByCondition(title);
    return new ResponseEntity<>(products,HttpStatus.OK);
}
@GetMapping("new")
public  ResponseEntity<List<Product>> productcreatenew()
    {
    List<Product>products= productRespository.productnew();
    return new ResponseEntity<>(products,HttpStatus.OK);
}
@GetMapping()
public ResponseEntity<List<Product>> getAllproduct(
    @RequestParam (defaultValue = "0") Integer page,
    @RequestParam (defaultValue = "10") Integer size,
    @RequestParam(required = false) Long categoryId
) {
   Pageable pageable=PageRequest.of(page, size);
    Page <Product>products;
    if(categoryId != null){
        products=productService.getProductsByCategoryId(categoryId, pageable);
    }
    else{
        products=productService.getAllProduct(pageable);
    }
    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-Range", "items " + pageable.getOffset() + "-" + (pageable.getOffset() + products.getSize()) +
    "/" + products.getTotalElements());
    return ResponseEntity.ok().headers(headers).body(products.getContent());
}
@PutMapping("{id}")
public ResponseEntity<Product> UpdateProductbyId(@PathVariable("id") Long productbyid,@RequestPart(value = "file",required = false)  MultipartFile file ,@RequestPart("product") Product product) throws IOException {
    try {
        Product updateProduct=productService.updateProduct(product,file,productbyid);
        return new ResponseEntity<>(updateProduct,HttpStatus.OK);
    } catch (Exception e) {
        return ResponseEntity.status(500).body(null);
    }
}
@DeleteMapping("{id}")

public ResponseEntity<String> UpdateProductbyId(@PathVariable("id") Long productbyid) {
    
    productService.deleteProduct(productbyid);
    return new ResponseEntity<>("da xoa thanh cong ",HttpStatus.OK);
}


};
