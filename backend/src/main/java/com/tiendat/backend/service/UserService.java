package com.tiendat.backend.service;

import com.tiendat.backend.entity.User;

import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.tiendat.backend.entity.ChangePassword;

public interface UserService {
    String login(User user,HttpSession  session);
    String register(User user,MultipartFile file)throws IOException ;
     String logout(HttpSession  session);
    String changePassword(ChangePassword model,HttpSession  session);
    User infor(HttpSession  session);
    String update(User user,MultipartFile file,HttpSession  session)throws IOException ;
    Page<User> getAll(Pageable pageable);
}
