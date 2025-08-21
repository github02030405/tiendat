
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { POST_CART, DELETE_CARTID, GET_CART, PUT_CART } from "../../api/apiService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Addtocart=()=>{
  const native = useNavigate();
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(null);
  const handleRemove = async (ProductId) => {
    try {
      await DELETE_CARTID(`orderdetail`,ProductId).then((props)=>{
      });
      loadCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  const updateCartHandler = async (ProductId, value) => {
    let updatedCart = cart.map((item) =>
      item.product.id === ProductId ? { ...item,num:item.num + value } : item
    );

    const updatedItem = updatedCart.find((item) => item.product.id === ProductId);
    try {
      await PUT_CART(`orderdetail`, ProductId, updatedItem).then((props)=>{
        console.log(props.data)
        console.log(ProductId)
      });
      // Reload cart after updating item
      loadCart();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  // Function to load cart data
  const loadCart = async () => {
    try {
      const cartData = await GET_CART(`orderdetail/all`);
      if (cartData?.data) {
        setCart(cartData.data);
      } else {
        alert("No products added to the cart");
        native("/")
      }
        console.log(cartData.data)
      const amountData = await GET_CART(`orderdetail/amount`);
      if (amountData?.data) {
        setAmount(amountData.data);
      } else {
        console.log("No data found:", amountData?.data);
      }
    } catch (error) {
      console.error("Error fetching cart data", error);
    }
  };
  useEffect(() => {
    loadCart(); // Load cart on component mount
  }, []);
    return (
    
<section class="section-content padding-y">
<div class="container">

<div class="row">
	<main class="col-md-9">
<div class="card">

<table class="table table-borderless table-shopping-cart">
<thead class="text-muted">
<tr class="small text-uppercase">
  <th scope="col">Product</th>
  <th scope="col" width="120">Quantity</th>
  <th scope="col" width="120">Price</th>
  <th scope="col" class="text-right" width="200"> </th>
</tr>
</thead>
<tbody>
{cart.length > 0 &&
                    cart.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <figure class="itemside">
                            <div class="aside">
                              {/* Assuming product image URL is accessible as item.product.image */}
                              <img src={`/images/products/${item.product.thumbnail}`} alt={item.product.name} class="img-sm" />
                            </div>
                            <figcaption class="info">
                              <a href="#" class="title text-dark">
                                {item.product.title}
                              </a>
                              <p class="text-muted small">
                                Size: {item.product.size || "N/A"}, Color: {item.product.color || "N/A"},<br />
                                Brand: {item.product.brand || "N/A"}
                              </p>
                            </figcaption>
                          </figure>
                        </td>
                        <td>
                      <div class="btn-group">
                      <button 
                        class="btn btn-primary" 
                        onClick={() =>updateCartHandler(item.product.id,-1)} 
                        disabled={item.num<=1}
                      >
                        -
                      </button>
                      <span style={{
                         padding: "10px",
                      }}>{item.num}</span>
                      <button 
                        class="btn btn-primary" 
                        onClick={() =>updateCartHandler(item.product.id,+1)} 

                      >
                        +
                      </button>
                      </div>
                        </td>
                        <td>
                          <div class="price-wrap">
                            <var class="price">${item.total_money}</var>
                            <small class="text-muted"> ${item.price} each </small>
                          </div>
                        </td>
                        <td class="text-right">
                          <a
                            href="#"
                            class="btn btn-light"
                            data-toggle="tooltip"
                            title="Save to Wishlist"
                          >
                            <i class="fa fa-heart"></i>
                          </a>
                          <a href="#" class="btn btn-light" onClick={(event)=>{handleRemove(item.product.id)}} > Remove </a>
                        </td>
                      </tr>
                   
                  ) 
                    
                  )}
                </tbody>
              </table>

<div class="card-body border-top">
	<a href="#" class="btn btn-primary float-md-right" onClick={(event)=> native(`/Address`)}> Make Purchase <i class="fa fa-chevron-right"></i> </a>
	<a href="#" class="btn btn-light"> <i class="fa fa-chevron-left"></i> Continue shopping </a>
</div>	
</div> 

<div class="alert alert-success mt-3">
	<p class="icontext"><i class="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks</p>
</div>

	</main> 
	<aside class="col-md-3">
		<div class="card mb-3">
			<div class="card-body">
			<form>
				<div class="form-group">
					<label>Have coupon?</label>
					<div class="input-group">
						<input type="text" class="form-control" name="" placeholder="Coupon code"/>
						<span class="input-group-append"> 
							<button class="btn btn-primary">Apply</button>
						</span>
					</div>
				</div>
			</form>
			</div> 
		</div>  
		<div class="card">
			<div class="card-body">
					<dl class="dlist-align">
					  <dt>Total:</dt>
					  <dd class="text-right  h5"><strong>{amount}</strong></dd>
					</dl>
					<hr/>
					<p class="text-center mb-3">
						<img src="images/misc/payments.png" height="26"/>
					</p>
					
			</div> 
		</div>  
	</aside> 
</div>

</div> 
</section>
)
};

export default Addtocart;

