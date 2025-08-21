package com.tiendat.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tiendat.backend.entity.OrderDetail;
import com.tiendat.backend.entity.Orders;
@Repository
public interface OrdersRespository extends JpaRepository<Orders,Long> {

     @Query("SELECT o FROM Orders o WHERE o.user.id = :userId ORDER BY o.order_date DESC" )
     List< Orders> findallByUser(Long userId);

     @Query("SELECT o  FROM Orders o  ORDER BY o.order_date,o.user.id ASC" )
     Page< Orders> findallOrders(Pageable pageable);

    

} 