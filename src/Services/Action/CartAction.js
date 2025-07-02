import { db } from "../../Firebase";
import {doc,setDoc,getDoc, collection, getDocs,} from "firebase/firestore";
    export const clearCart = () => ({
      type: "CLEAR_CART",
    });

    export const fetchCartAsync = () => async (dispatch, getState) => {
      const { user } = getState().authReducer;
      if (!user) return;
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        const cartItems = cartSnap.data().items || [];
        dispatch({ type: "SET_CART_ITEMS", payload: cartItems });
      } else {
        dispatch({ type: "SET_CART_ITEMS", payload: [] });
      }
    };



    export const addToCartAsync = (product) => async (dispatch, getState) => {
      const { user } = getState().authReducer;
      if (!user) return;
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      let cartItems = cartSnap.exists() ? cartSnap.data().items || [] : [];
      const existingIndex = cartItems.findIndex((item) => item.id === product.id);
      if (existingIndex >= 0) {
        cartItems[existingIndex].quantity += 1;
      }      else {
        cartItems.push({
          ...product,
          quantity: 1,
          price: Number(product.price), 
        });
      }
    await setDoc(cartRef, { items: cartItems });
      dispatch({ type: "SET_CART_ITEMS", payload: cartItems });
    };

    export const incrementQtyAsync = (id) => async (dispatch, getState) => {
      const { user } = getState().authReducer;
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      if (!cartSnap.exists()) return;
       const cartItems = cartSnap.data().items || [];
      const index = cartItems.findIndex((item) => item.id === id);
      if (index >= 0) {
        cartItems[index].quantity += 1;
        await setDoc(cartRef, { items: cartItems });
        dispatch({ type: "SET_CART_ITEMS", payload: cartItems });
      }
    };


    export const decrementQtyAsync = (id) => async (dispatch, getState) => {
      const { user } = getState().authReducer;
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      if (!cartSnap.exists()) return;
      let cartItems = cartSnap.data().items || [];
      const index = cartItems.findIndex((item) => item.id === id);
      if (index >= 0) {
        if (cartItems[index].quantity > 1) {
          cartItems[index].quantity -= 1;
        } else {
          cartItems.splice(index, 1);
        }
        await setDoc(cartRef, { items: cartItems });
        dispatch({ type: "SET_CART_ITEMS", payload: cartItems });
      }
    };

    export const removeFromCartAsync = (id) => async (dispatch, getState) => {
      const { user } = getState().authReducer;
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      if (!cartSnap.exists()) return;
      const cartItems = cartSnap.data().items || [];
      const updatedItems = cartItems.filter((item) => item.id !== id);
      await setDoc(cartRef, { items: updatedItems });
      dispatch({ type: "SET_CART_ITEMS", payload: updatedItems });
    };


export const clearCartAsync = (userId) => {
  return async (dispatch) => {
    try {
      const cartRef = doc(db, "carts", userId);
      await setDoc(cartRef, { items: [] }); 
      dispatch({ type: "CLEAR_CART_SUCCESS" });
    } catch (error) {
      console.error("Error clearing cart:", error.message);
    }
  };
};