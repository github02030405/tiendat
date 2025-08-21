package com.tiendat.backend.service.impl;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import com.tiendat.backend.entity.ChangePassword;
import com.tiendat.backend.entity.Product;
import com.tiendat.backend.entity.User;
import com.tiendat.backend.repository.UserRespository;
import com.tiendat.backend.service.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {
  private static final String UPLOAD_fe = "front-end\\public\\images\\user\\";
  private static final String UPLOAD_fe_admin = "C:\\Users\\Admin\\Documents\\tiendat\\fe-admin\\public\\";

    private UserRespository userRepository;
    @Override
    public String login(User user,HttpSession session) {
      // Optional<User> userOpt = userRepository.findByEmail(user.getEmail());
      // User u=userOpt.get();
      // if (!u.getPassword().equals(user.getPassword())) {
      //   return "mat khau k hinh xac";
      // }
      // session.setAttribute("user",u);
      // return "Login successful";
      Optional<User> userOpt = userRepository.findByEmail(user.getEmail());
      // Kiểm tra nếu người dùng không tồn tại
      if (!userOpt.isPresent()) {
          return "Email không tồn tại";
      }
  
      User u = userOpt.get();
  
      // So sánh mật khẩu (cần mã hóa và so sánh hash nếu đang dùng mật khẩu mã hóa)
      if (!u.getPassword().equals(user.getPassword())) {
          return "Mật khẩu không chính xác";
      }
  
      // Lưu thông tin người dùng vào session
      session.setAttribute("user", u);
      return "Login successful";
    }
    
    @Override
    public String register(User user,MultipartFile file) throws IOException {
      if (file.isEmpty()) {
        throw new IllegalArgumentException("File không hợp lệ.");
    }
      if (userRepository.findByEmail(user.getEmail()).isPresent()) {
        return "Email already exists";
    } 
    if (file != null && !file.isEmpty()) {
        byte[] bytes = file.getBytes();
        String fileName = file.getOriginalFilename();
        Path pathfe = Paths.get(UPLOAD_fe + fileName);
        Path pathfe_adim = Paths.get(UPLOAD_fe_admin + fileName);
        Files.write(pathfe, bytes);
        Files.write(pathfe_adim, bytes);
        user.setThumbnail(fileName);
    }
    // User u=new User();
    // u.setEmail(user.getEmail());
    // u.setPassword(user.getPassword());
    // u.setFullname(user.getFullname());
    // u.setPhone_number(user.getPhone_number());
    // u.setCreate_at(new Date());
    // u.setThumbnail(filePath);
    user.setCreate_at(new Date());
    userRepository.save(user);
    return "tao tai khoan thanh cong";
    }
    
    @Override
    public String logout(HttpSession session) {
      if(session == null){
        return "chua dang nhap";
      }
        session.invalidate();
        return "da xoa thanh cong";
     
    }
    @Override
    public String changePassword(ChangePassword model,HttpSession session) {
      if(model.getOldPassword().isEmpty()||model.getNewPassword().isEmpty()){
          return"chua dien password";
      }
      User sessionUser=(User) session.getAttribute("user");
      if(sessionUser == null){
        return "User is not logged in.";
      }

      Optional<User> optionalUser =userRepository.findByEmail(sessionUser.getEmail());
      if(!optionalUser .isPresent()){
          return "Incorrect old password.";
      }
      User user = optionalUser.get();
      if(!user.getPassword().equals(model.getOldPassword())){
          return "Incorrect old password.";
      }
      user.setPassword(model.getNewPassword());
      userRepository.save(user);
      session.setAttribute("user", user);
      return "doi mat khau thanh cong";
    }
    @Override
    public User infor(HttpSession session) {
      User user=(User) session.getAttribute("user");
      return user;
    }
    @Override
    public String update(User model,MultipartFile file,HttpSession session) throws IOException {
      User user =(User) session.getAttribute("user");
       User existUser = userRepository.findByEmail(user.getEmail()).get();
      
       if(existUser == null){
        return "User with ID not found";
       }
       if(!existUser.getEmail().equals(model.getEmail()))
       {Optional<User> emailUser = userRepository.findByEmail(model.getEmail());
        if(emailUser.isPresent() && !emailUser.get().getId().equals(existUser.getId())){
          return "Email already exists.";
        }
        existUser.setEmail(model.getEmail());
       }
    if (file != null && !file.isEmpty()) {
      byte[] bytes = file.getBytes();
      String fileName = file.getOriginalFilename();
      Path pathfe = Paths.get(UPLOAD_fe + fileName);
      Path path = Paths.get(UPLOAD_fe_admin + fileName);

      Files.write(pathfe, bytes);
      Files.write(path, bytes);

      existUser.setThumbnail(fileName);

  }

      existUser.setFullname(model.getFullname());
       existUser.setPhone_number(model.getPhone_number());
       existUser.setUpdated_at(new Date());
       existUser.setAddress(model.getAddress());
      session.setAttribute("user", existUser);
       userRepository.save(existUser);
         return"doi mat khau thanh cong";
    }
    @Override
    public Page<User> getAll(Pageable pageable) {
       
      return userRepository.findAll(pageable);
    }
}

  