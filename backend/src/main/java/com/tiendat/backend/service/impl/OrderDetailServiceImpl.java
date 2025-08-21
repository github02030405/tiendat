package com.tiendat.backend.service.impl;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tiendat.backend.entity.OrderDetail;
import com.tiendat.backend.entity.Orders;
import com.tiendat.backend.entity.Product;
import com.tiendat.backend.repository.OrderDetailRespository;
import com.tiendat.backend.repository.ProductRespository;
import com.tiendat.backend.service.OrderDetailService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.Collection;
@AllArgsConstructor
@NoArgsConstructor
@Service
public class OrderDetailServiceImpl implements OrderDetailService {
	private long increateId=0;
    @Autowired
    private OrderDetailRespository orderDetailRespository;
	@Autowired
    private ProductRespository productRespository;

	private HashMap<Long,OrderDetail>getCart(HttpSession session){
		HashMap<Long, OrderDetail> cart =(HashMap<Long, OrderDetail>) session.getAttribute("cart");
		if (cart == null) {
			cart = new HashMap<>();
			session.setAttribute("cart", cart);
		}
		return cart;
	}
	@Override
    public OrderDetail createOderDetail( Long productId,HttpSession session){
    Optional<Product> optionalProduct = productRespository.findById(productId);
    Product product = optionalProduct.get();
	HashMap<Long, OrderDetail>map=getCart(session);
	OrderDetail order = map.get(productId);
	if (order == null) {
				// Nếu chưa có OrderDetail cho sản phẩm, tạo mới
				 order =new OrderDetail();
				 order.setId(increateId=increateId+1);
				 order.setPrice(product.getPrice());
				 order.setNum(1);
				 order.setProduct(product);
				 order.setTotal_money(product.getPrice());
				 map.put(order.product.getId(), order);
				session.setAttribute("cart", map);
	} else {
				// Nếu đã có OrderDetail, cập nhật số lượng
				order.setNum(order.getNum() + 1);
				order.setTotal_money(order.getNum() * order.getPrice());
			}
	return order ;
		}

    @Override
	public void deleteID(Long productId,HttpSession session) {
		HashMap<Long, OrderDetail> cart=(HashMap<Long, OrderDetail>) session.getAttribute("cart");
		if(cart.size()==1){
			session.removeAttribute("cart");
		}
		cart.remove(productId);
		session.setAttribute("cart", cart);

	}
	@Override
	public OrderDetail update(Long productId, Integer qty,HttpSession session) {
		
		HashMap<Long, OrderDetail> cart=(HashMap<Long, OrderDetail>) session.getAttribute("cart");
		OrderDetail item = cart.get(productId);
		if (item != null ) {
			item.setNum(qty);	
			item.setTotal_money(item.getPrice() * qty);
			session.setAttribute("cart", cart);  // Cập nhật session
		}
		return item ;
	}
	@Override
	public void clear(HttpSession session) {
		
		HashMap<Long, OrderDetail> cart=(HashMap<Long, OrderDetail>) session.getAttribute("cart");

		cart.clear();
		session.setAttribute("cart", cart);

	}

	@Override
	public int getCount(HttpSession session) {
	
		HashMap<Long, OrderDetail> cart=	(HashMap<Long, OrderDetail>) session.getAttribute("cart");
		return cart.values().stream()
				.mapToInt(item -> item.getNum())
				.sum();
	}
	@Override
	public int getAmount(HttpSession session) {
		HashMap<Long, OrderDetail> cart=	(HashMap<Long, OrderDetail>) session.getAttribute("cart");

		return cart.values().stream()
				.mapToInt(item -> item.getPrice()*item.getNum())
				.sum();
	}
    @Override
    public Collection<OrderDetail> getItems(HttpSession session) {
		Map<Long, OrderDetail> map1=(HashMap<Long, OrderDetail>) session.getAttribute("cart");
        return  map1.values();
    }
	@Override
	public String save(HttpSession session ,Orders orders) {
		HashMap<Long, OrderDetail> map = (HashMap<Long, OrderDetail>) session.getAttribute("cart");
		if(map != null && !map.isEmpty()){
			for (OrderDetail orderDetail : map.values()) {
				orderDetail.setOrder(orders);
				orderDetailRespository.save(orderDetail);
			}
			map.clear();
			session.setAttribute("cart", map);
			
			return "Saved to cart";
		}else {
			throw new RuntimeException("No items in cart");
		}
	}
	@Override
	public OrderDetail putOrderDetail(OrderDetail orderDetail,HttpSession session) {
		HashMap<Long, OrderDetail> cart = getCart(session);
		if (cart == null || cart.get(orderDetail.getId()) == null) {
			throw new RuntimeException("No product in cart");
		}
		OrderDetail putOrder=cart.get(orderDetail.product.getId());
		putOrder.setNum(orderDetail.getNum());
		putOrder.setPrice(orderDetail.getPrice());
		putOrder.setTotal_money(orderDetail.getTotal_money());
		putOrder.setProduct(orderDetail.product);
		putOrder.setOrder(orderDetail.getOrder());
		session.setAttribute("cart", cart);
		return putOrder;
	}
	@Override
	public Page<OrderDetail>getall(Pageable pageable) {
		return orderDetailRespository.findAll(pageable);
	}
	@Override
	public List<OrderDetail> findByOrderId(Long orderId) {
    return orderDetailRespository.findByOrderId(orderId);
}
}

