import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
export const CartContext = createContext();
function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [currentCartItems, setCurrentCartItems] = useState([]);
  const uid = localStorage.getItem("uid");
  const { isUser, flagToResetCartItems } = useContext(UserContext);

  useEffect(() => {
    setCartItems([]);
  }, [flagToResetCartItems]);

  // GETTING ALL ITEMS FROM STORAGE
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(uid));
    if (Array.isArray(data) && data.length != 0) {
      setCartItems([...data]);
    }
  }, [uid]);

  // SETTING ITEMS TO CART LIST
  useEffect(() => {
    if (cartItems.length != 0) {
      localStorage.setItem(uid, JSON.stringify(cartItems));
    }
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

  function decreaseItemQuantity(id) {
    const arr = cartItems;
    const productInd = cartItems.findIndex((item) => item.id == id);
    arr[productInd].quantity--;
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
        decreaseItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export default CartContextProvider;
