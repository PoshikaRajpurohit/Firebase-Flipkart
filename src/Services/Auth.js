import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../Firebase";
import { setUserFromFirebase, authCheckDone } from "./Action/AuthAction";
import { fetchCartAsync, clearCart } from "./Action/CartAction";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserFromFirebase(user));
        dispatch(fetchCartAsync());
      } else {
        dispatch(setUserFromFirebase(null));
        dispatch(clearCart());
      }

      dispatch(authCheckDone()); 
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthListener;



