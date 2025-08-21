package com.tiendat.backend.repository;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.tiendat.backend.entity.InforUser;
import com.tiendat.backend.entity.Orders;
public interface InforUserRespository extends JpaRepository<InforUser,Long> {
     @Query("SELECT o FROM InforUser o WHERE o.user.id = :userId ORDER BY o.date DESC" )
     List< InforUser> findallByUser(Long userId);
     @Query("SELECT o  FROM InforUser o  ORDER BY o.user.id ASC" )
     Page< InforUser> findall(Pageable pageable);
} 