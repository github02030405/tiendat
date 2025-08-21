package com.tiendat.backend.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tiendat.backend.entity.OrderDetail;
import com.tiendat.backend.entity.Orders;
@Repository
public interface OrderDetailRespository extends JpaRepository<OrderDetail,Long> {

       @Query("SELECT o FROM OrderDetail o WHERE o.product.id =: productId" )
      OrderDetail findorderDetailbyId(Long productId);

      @Query("SELECT o FROM OrderDetail o  ORDER BY o.product.id ASC" )
      List< OrderDetail> getallorderdetail();
    List<OrderDetail> findByOrderId(Long orderId);
} 