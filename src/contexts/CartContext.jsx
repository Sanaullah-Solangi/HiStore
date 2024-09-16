import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cartItems"));
    if (data.length != 0) {
      setCartItems([...data]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // FUNCTION TO ADD & UPDATE TO CART LIST
  function addItemToCart(item) {
    let arr = cartItems;
    const productInd = cartItems.findIndex((data) => data.id == item.id);
    if (productInd != -1) {
      arr[productInd].quantity++;
    } else {
      arr.push(item);
    }
    setCartItems([...arr]);
  }

  // FUNCTION TO REMOVE ITEM FROM CART LIST
  function removeItemFromCartList(id) {
    let arr = cartItems;
    const productInd = cartItems.findIndex((data) => data.id == id);
    arr.splice(productInd, 1);
    setCartItems([...arr]);
  }

  // FUNCTION TO CHECK WHETHER ITEM EXITS OR NOT
  function isProductExist(id) {
    const productInd = cartItems.findIndex((item) => item.id == id);
    if (productInd != -1) {
      return cartItems[productInd];
    } else {
      return false;
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCartList,
        isProductExist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export default CartContextProvider;
