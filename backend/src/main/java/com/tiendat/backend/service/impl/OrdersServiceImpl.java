package com.tiendat.backend.service.impl;

import java.lang.ProcessHandle.Info;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.hibernate.query.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tiendat.backend.entity.InforUser;
import com.tiendat.backend.entity.OrderDetail;
import com.tiendat.backend.entity.Orders;
import com.tiendat.backend.entity.User;
import com.tiendat.backend.repository.InforUserRespository;
import com.tiendat.backend.repository.OrdersRespository;
import com.tiendat.backend.service.OrderDetailService;
import com.tiendat.backend.service.OrdersService;
import org.springframework.data.domain.Page;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Service
public class OrdersServiceImpl implements OrdersService {
    @Autowired
    private OrderDetailService orderDetailService;
    @Autowired
    private InforUserRespository inforUserRespository;
    @Autowired
    private OrdersRespository ordersRespository;
    @Override
    public Orders create(HttpSession session) {
    User user = (User) session.getAttribute("user");
    Map<Long, OrderDetail> cart = (HashMap<Long, OrderDetail>) session.getAttribute("cart");
    List<InforUser>allinfor = inforUserRespository.findallByUser(user.getId());
    int amount=    orderDetailService.getAmount(session);
    List<OrderDetail> orderDetails = cart.values().stream().toList();
    Orders orders=new Orders();
    for (InforUser InforUser : allinfor) {
        if(InforUser.getStatus()==1){
            orders.setInforUser(InforUser);
            break;
        }
    }
    orders.setUser(user);
    orders.setOrderDetails(orderDetails);
    orders.setTotal_money(amount);
    orders.setOrder_date(new Date());
    Orders savedOrder = ordersRespository.save(orders);
    orderDetailService.save(session, savedOrder);
    session.removeAttribute("cart");  
    return savedOrder;
}
    @Override
    public List<Orders>allOrders(Long userId) {
        return ordersRespository.findallByUser(userId);
    }
    @Override
    public Orders update(Orders order) {
        Optional <Orders> optionalOrder = ordersRespository.findById(order.getId());
        if(!optionalOrder .isPresent()){
               throw new IllegalArgumentException("Order with ID " + order.getId() + " not found");
           }
           Orders updates = optionalOrder.get();   
       if(updates != null){
                // updates.setFullname(order.getFullname());
                // updates.setEmail(order.getEmail());
                // updates.setAddress(order.getAddress());
                // updates.setPhone_number(order.getPhone_number());
                updates.setOrder_date(new Date());
                updates.setRote(order.getRote());
                updates.setUser(order.getUser());
                updates.setOrderDetails(order.getOrderDetails());
                ordersRespository.save(updates);
       }
       return updates;
    }
    // public Orders updateStatus(Orders order,HttpSession session) {
    //     User user=(User) session.getAttribute("user");
    //     List<Orders>allOrders = ordersRespository.findallByUser(user.getId());
    //  Optional <Orders> optionalOrder = ordersRespository.findById(order.getId());
    //   if(!optionalOrder .isPresent()){
    //     throw new IllegalArgumentException("Order with ID " + order.getId() + " not found");
    // }
    // Orders updates = optionalOrder.get();   
    //    if(updates.getStatus()==0){
    //     updates.setStatus(1);
    //    }
    //    ordersRespository.save(updates);
    //    for (Orders orders : allOrders) {
    //     if(!orders.getId().equals(order.getId())){
    //         orders.setStatus(0);
    //         ordersRespository.save(orders);
    //     }
    //    }
    //    return updates;
    // }
    @Override
    public void deleteItem(Long id) {

        ordersRespository.deleteById(id);
    }
    @Override
    public Page<Orders> findallOrders(Pageable pageable) {
       return ordersRespository.findAll(pageable);
    }
}

