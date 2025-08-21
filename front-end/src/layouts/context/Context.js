import React, { useState } from "react";
import Items from "../../pages/home/Items";
import Header from "../Header";
const Context = () => {
  const [productId, setProductId] = useState("");
 const [cartAmount, setCartAmount] = useState(0); // 👈 thêm state cho giỏ hàng

  const handleAddToCart = () => {
    setCartAmount(prev => prev + 1); // 👈 tăng mỗi lần gọi
  };
  return (
    <div>
      <Items productSelect={setProductId} onAddToCart={handleAddToCart}/>
      <Header product={productId}aamount={cartAmount} />
    </div>
  );
};

export default Context;