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
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tiendat.backend.entity.ChangePassword;
import com.tiendat.backend.entity.Product;
import com.tiendat.backend.entity.User;
import com.tiendat.backend.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;



@RestController
@AllArgsConstructor
@RequestMapping(value = "api/user")
@CrossOrigin(origins ={"http://localhost:3000","http://localhost:3001"},allowCredentials = "true", 
             allowedHeaders = "*", 
             exposedHeaders = "Content-range"
              )
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("register")
    public ResponseEntity<String> register(@RequestPart User user,@RequestPart(value = "file", required = false)  MultipartFile file) throws IOException {
        String tk=  userService.register(user,file) ; 
         return new ResponseEntity<>(tk,HttpStatus.CREATED);
    }
    @PostMapping("login")
    public ResponseEntity<String> Login(@RequestBody User user,HttpSession session) {
        String token = userService.login(user,session);
        return new ResponseEntity<>(token,HttpStatus.OK);
    }
    @GetMapping("infor")
    public ResponseEntity<?> inforuser(HttpSession session){
         if(session.getAttribute("user") == null){
            return new ResponseEntity<>("chua dang nhap",HttpStatus.OK);
         }
        User user=  userService.infor(session);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }
    @GetMapping("logout")
    public String Logout(HttpSession session){
      return  userService.logout(session);
    }
    @PutMapping("password")
    public ResponseEntity<String>  Update( @RequestBody ChangePassword user,HttpSession session) {
        String updateuser=userService.changePassword(user, session);
          return new ResponseEntity<>(updateuser,HttpStatus.OK);
    }
    @PutMapping()
    public ResponseEntity<String>  Update(
        //   return new ResponseEntity<>(updateuser,HttpStatus.OK);
         @RequestPart("user") User user, // JSON string for user data
    @RequestPart(value = "file", required = false) MultipartFile file, 
    HttpSession session) throws IOException {
    
    String updateResponse = userService.update(user, file, session);
    return new ResponseEntity<>(updateResponse, HttpStatus.OK);
    }
    @GetMapping()
    public ResponseEntity<List<User>> alluser( @RequestParam (defaultValue = "0") Integer page,
    @RequestParam (defaultValue = "10") Integer size
    ) {
   Pageable pageable=PageRequest.of(page, size);
    Page <User>user;
    user=userService.getAll(pageable);
    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-Range", "items " + pageable.getOffset() + "-" + (pageable.getOffset() + user.getSize()) +
    "/" + user.getTotalElements());
    return ResponseEntity.ok().headers(headers).body(user.getContent());
    }
    
}

