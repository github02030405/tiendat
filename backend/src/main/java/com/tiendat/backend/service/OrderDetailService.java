package com.tiendat.backend.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tiendat.backend.entity.OrderDetail;
import com.tiendat.backend.entity.Orders;
import com.tiendat.backend.entity.Product;
import jakarta.servlet.http.HttpSession;

public interface OrderDetailService {
   public OrderDetail createOderDetail(Long productId,HttpSession session);
	
   public OrderDetail update(Long id, Integer qty,HttpSession session);

	public void clear(HttpSession session);
	public String save(HttpSession session,Orders orders);
	public Collection<OrderDetail> getItems(HttpSession session);
	public int getCount(HttpSession session);
	public void deleteID(Long productId,HttpSession session);
	public int getAmount(HttpSession session);
	public OrderDetail putOrderDetail(OrderDetail orderDetail,HttpSession session);
    public Page<OrderDetail> getall(Pageable pageable);
	public List<OrderDetail> findByOrderId(Long orderId);
} 