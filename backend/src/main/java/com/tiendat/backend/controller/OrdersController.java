// OrdersController.java
package com.tiendat.backend.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tiendat.backend.entity.Orders;
import com.tiendat.backend.entity.User;
import com.tiendat.backend.service.OrdersService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@AllArgsConstructor
@RequestMapping(value = "api/orders")
@CrossOrigin(origins  = {"http://localhost:3000", "http://localhost:3001"},allowCredentials = "true",allowedHeaders=("*"), exposedHeaders = "Content-Range",
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class OrdersController {
    private  OrdersService ordersService;
    @PostMapping
    public ResponseEntity<?> createOrder( HttpSession session) {
      
        if(session.getAttribute("user")==null  ){
            return new ResponseEntity<>("User is not logged in", HttpStatus.UNAUTHORIZED);
        }
        if(session.getAttribute("cart")==null ){
            return new ResponseEntity<>("bạn chưa chọn sản phẩm nào", HttpStatus.BAD_REQUEST);
        }
            Orders t=   ordersService.create(session);
            return new ResponseEntity<>(t, HttpStatus.CREATED);
    }
    @GetMapping("all")
    public ResponseEntity<?> getAllOrder(HttpSession session) {
        if (session.getAttribute("user") == null) {
            return new ResponseEntity<>("User is not logged in", HttpStatus.UNAUTHORIZED);
        }
        User user=(User) session.getAttribute("user");
            List<Orders> orders = ordersService.allOrders(user.getId());
            HttpHeaders headers=new HttpHeaders();
                headers.add("Content-Range","item 0"+orders.size()+"/"+orders.size());
            return ResponseEntity.ok().headers(headers).body(orders);
    }
   
    
    // @PutMapping("status/{id}")
    // public ResponseEntity< Orders> UpdateStatus(@PathVariable("id") Long id, @RequestBody Orders order,HttpSession session) {
    //         Orders update=ordersService.updateStatus(order,session);
    //         return new ResponseEntity<>(update,HttpStatus.OK);
    //     }
    @PutMapping("{id}")
        public ResponseEntity< Orders> Update(@PathVariable("id") Long id, @RequestBody Orders order) {
                Orders update=ordersService.update(order);
                return new ResponseEntity<>(update,HttpStatus.OK);
            }
    @DeleteMapping("{id}")
    public ResponseEntity<String> deletedId(@PathVariable("id") Long id) {
            ordersService.deleteItem(id);
            return new ResponseEntity<>("da xoa thanh cong",HttpStatus.OK);
        }
    @GetMapping()
    public ResponseEntity<List<Orders>> getAllOrders(@RequestParam (defaultValue = "0") Integer page,
    @RequestParam (defaultValue = "10") Integer size
    ) {
    Pageable pageable=PageRequest.of(page, size);
    Page <Orders>orders;
    orders=ordersService.findallOrders(pageable);
    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-Range", "items " + pageable.getOffset() + "-" + (pageable.getOffset() + orders.getSize()) +
    "/" + orders.getTotalElements());
    return ResponseEntity.ok().headers(headers).body(orders.getContent());
    }
}