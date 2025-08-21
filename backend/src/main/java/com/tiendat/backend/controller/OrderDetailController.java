package com.tiendat.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.tiendat.backend.entity.Category;
import com.tiendat.backend.entity.OrderDetail;
import com.tiendat.backend.entity.Product;
import com.tiendat.backend.entity.User;
import com.tiendat.backend.repository.OrderDetailRespository;
import com.tiendat.backend.repository.ProductRespository;
import com.tiendat.backend.service.OrderDetailService;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpHeaders;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
@RestController
@AllArgsConstructor
@RequestMapping(value="api/orderdetail")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, 
             allowCredentials = "true", 
             allowedHeaders = "*", 
             exposedHeaders = "Content-range"
             )
public class OrderDetailController {
  @Autowired
  private OrderDetailService orderDetailService;
   private OrderDetailRespository orderDetailRepository;
  @PostMapping("{id}")
  public ResponseEntity<?> create(@PathVariable("id") Long productId ,HttpSession session) {
    OrderDetail response = orderDetailService.createOderDetail(productId,session);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
@GetMapping
    public ResponseEntity<List<OrderDetail>> getByOrderId(
            @RequestParam(name = "orderId") Long orderId) {

        List<OrderDetail> details = orderDetailService.findByOrderId(orderId);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "items 0-" + details.size() + "/" + details.size());

        return ResponseEntity.ok().headers(headers).body(details);
    }
  @GetMapping("all")
  public ResponseEntity<?> getall(HttpSession session) {
    HashMap<Long, OrderDetail>listdetail=(HashMap<Long, OrderDetail>) session.getAttribute("cart");
    if(listdetail==null){
      return new ResponseEntity<>("chưa thêm sản phẩm vào giỏ hàng", HttpStatus.NO_CONTENT);
    }
    Collection<OrderDetail> getAll=orderDetailService.getItems(session);
    return new ResponseEntity<>(getAll,HttpStatus.OK);
  }
  @GetMapping("amount")
  public ResponseEntity<Integer>  getamount(HttpSession session) {
    if (session.getAttribute("cart") == null) {
      return new ResponseEntity<>(0, HttpStatus.OK);
  }
    int amount = orderDetailService.getAmount(session);
    return new ResponseEntity<>(amount, HttpStatus.OK);
  }
  @GetMapping("acount")
  public  ResponseEntity<Integer>  getcount(HttpSession session) {
    if (session.getAttribute("cart") == null) {
      return new ResponseEntity<>(0, HttpStatus.OK);
  }
  int count = orderDetailService.getCount(session);
  return new ResponseEntity<>(count, HttpStatus.OK);
  }
  @DeleteMapping("{id}")
  public ResponseEntity<String> deletCart(@PathVariable("id") Long productId,HttpSession session) {
    if (session.getAttribute("cart") == null) {
      return new ResponseEntity<>("Cart is empty", HttpStatus.UNAUTHORIZED);
  }
  orderDetailService.deleteID(productId, session);
  return new ResponseEntity<>("Đã xóa thành công", HttpStatus.OK);
}
@PutMapping("{id}")
public ResponseEntity<OrderDetail> UpdateCart(@PathVariable("id") Long productId, @RequestBody OrderDetail orderDetail,HttpSession session) {
        OrderDetail putOrderDetail=orderDetailService.update(productId,orderDetail.getNum(), session);
        return new ResponseEntity<>(putOrderDetail,HttpStatus.OK);
}
// @GetMapping()
// public ResponseEntity<List<OrderDetail>> getMethodName( @RequestParam (defaultValue = "0") Integer page,
//     @RequestParam (defaultValue = "10") Integer size
//     ) {
//    Pageable pageable=PageRequest.of(page, size);
//     Page <OrderDetail>orderDetail;
//     orderDetail=orderDetailService.getall(pageable);
//     HttpHeaders headers = new HttpHeaders();
//     headers.add("Content-Range", "items " + pageable.getOffset() + "-" + (pageable.getOffset() + orderDetail.getSize()) +
//     "/" + orderDetail.getTotalElements());
//     return ResponseEntity.ok().headers(headers).body(orderDetail.getContent());
//     }
    

} 