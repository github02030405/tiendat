package com.tiendat.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tiendat.backend.entity.Orders;

import jakarta.servlet.http.HttpSession;

public interface OrdersService {
        public Orders create(HttpSession session);
        public List<Orders> allOrders(Long userId);
        public Orders update(Orders orders);
        public void deleteItem(Long orderId);
        // Orders updateStatus(Orders order,HttpSession session);
        public Page<Orders> findallOrders(Pageable pageable);

}
