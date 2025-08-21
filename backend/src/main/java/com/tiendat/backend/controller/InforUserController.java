package com.tiendat.backend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tiendat.backend.entity.Category;
import com.tiendat.backend.entity.ChangePassword;
import com.tiendat.backend.entity.InforUser;
import com.tiendat.backend.entity.Orders;
import com.tiendat.backend.entity.Product;
import com.tiendat.backend.entity.User;
import com.tiendat.backend.repository.InforUserRespository;
import com.tiendat.backend.service.InforUserService;
import com.tiendat.backend.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.val;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@AllArgsConstructor
@RequestMapping(value = "api/address")
@CrossOrigin(origins ={"http://localhost:3000","http://localhost:3001"},allowCredentials = "true", 
             allowedHeaders = "*", 
             exposedHeaders = "Content-range"
              )
public class InforUserController {
    @Autowired
    private InforUserRespository inforUserRespository;
    private InforUserService inforUserService;
    @PostMapping()
    public ResponseEntity<?> create(@RequestBody InforUser inforUser,HttpSession session) {
        InforUser save=   inforUserService.createInforUser(inforUser, session);
        return new ResponseEntity<>(save,HttpStatus.CREATED);
    }
    @PutMapping("status/{id}")
    public ResponseEntity<InforUser> putStatus(@PathVariable Long id,HttpSession session) {
        InforUser update=inforUserService.updateStatus(id,session);
         return new ResponseEntity<>(update,HttpStatus.OK);
    }
    @GetMapping("user")
    public ResponseEntity<List<InforUser>> getItemByUser(HttpSession session) {
        List<InforUser> listinforuser=inforUserService.getallByUser(session);
        return new ResponseEntity<>(listinforuser,HttpStatus.OK);
    }
    @GetMapping()
    public ResponseEntity<List<InforUser>> getallItem(@RequestParam (defaultValue = "0") Integer page,
    @RequestParam (defaultValue = "10") Integer size
    ) {
    Pageable pageable=PageRequest.of(page, size);
    Page <InforUser>inforUser;
    inforUser=inforUserRespository.findAll(pageable);
    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-Range", "items " + pageable.getOffset() + "-" + (pageable.getOffset() + inforUser.getSize()) +
    "/" + inforUser.getTotalElements());
    return ResponseEntity.ok().headers(headers).body(inforUser.getContent());
    }
    @PutMapping("{id}")
    public ResponseEntity<InforUser> putInforUser(@PathVariable Long id, @RequestBody InforUser inforUser) {
        InforUser update=inforUserService.updateInforUser(id,inforUser);
        return new ResponseEntity<>(update,HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String>deletca(@PathVariable("id") Long id){
        inforUserService.deletId(id);
         return new ResponseEntity<>("Address was successfully deleted",HttpStatus.OK);
     }
}
