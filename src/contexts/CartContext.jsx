import { createContext, useContext, useEffect, useState } from "react";
// import { UserContext } from "./UserContext";
export const CartContext = createContext();
function CartContextProvider({ children }) {
  // const { flagToResetCartItems } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [deliveredItems, setDeliveredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const order = localStorage.getItem("order");
  const userCart = localStorage.getItem("userCart");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  // useEffect(() => {
  //   setCartItems([]);
  // }, [flagToResetCartItems]);
  // GETTING ALL ITEMS FROM STORAGE
  useEffect(() => {
    if (userCart == loggedInUser?.userCart) {
      const data = JSON.parse(localStorage.getItem(userCart));
      const items = JSON.parse(localStorage.getItem(order));
      // console.log("CARTED ITEM IN USEEFFECT", data);
      if (Array.isArray(data) && data.length != 0) {
        setCartItems([...data]);
      }
      if (Array.isArray(items) && items.length != 0) {
        setDeliveredItems([...items]);
      }
    } else {
      setCartItems([]);
    }
  }, [userCart]);
  // SETTING ITEMS TO CART LIST
  useEffect(() => {
    if (cartItems.length != 0) {
      localStorage.setItem(userCart, JSON.stringify(cartItems));
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
        deliveredItems,
        searchTerm,
        setSearchTerm,
        setDeliveredItems,
        setCartItems,
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
