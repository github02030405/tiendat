package com.tiendat.backend.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tiendat.backend.entity.User;

public interface UserRespository extends JpaRepository<User,Long>{
  
   Optional<User> findByEmail(String email); 
   Optional<User> findByPassword(String password); 

}
