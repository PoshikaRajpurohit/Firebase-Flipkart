import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc, setDoc} from "firebase/firestore";
import { db } from "../../Firebase";
export const loading = () => (
  { type: "LOADING" }
);
export const addProductSuc = ()     =>
   (
    { type: "ADD_PRODUCT_SUC" });
export const addProductRej = (err)  =>
   (
    { type: "ADD_PRODUCT_REJ",  payload: err }
  );
export const getAllProducts= (data) =>
   (
    { type: "GET_ALL_PRODUCTS", payload: data }
  );
export const getProductSuc = (data) =>
   (
    { type: "GET_PRODUCT_SUC", 
       payload: data }
      );
export const deleteProductRej= (err)=>
   ({ type: "DELETE_PRODUCT_REJ", payload: err }
   );
export const updateProductSuc= (data) =>
   ({ type: "UPDATE_PRODUCT_SUC", 
    payload: data }
  );
export const getAllProductsAsync = () => async (dispatch) => {
  dispatch(loading());
  try {
    const snapshot = await getDocs(collection(db, "products"));
    const data = snapshot.docs.map((rec) => rec.data());
    dispatch(getAllProducts(data));
  } catch (err) {
    dispatch(addProductRej(err.message));
  }
};
export const addNewProductAsync = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    await setDoc(doc(db, "products", data.id), data);
    dispatch(addProductSuc());
      dispatch(getAllProductsAsync());
  } catch (err) {
    dispatch(addProductRej(err.message));
   
  }
};
export const deleteProductAsync = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    await deleteDoc(doc(db, "products", id));
    dispatch(getAllProductsAsync()); 
  } catch (err) {
    dispatch(deleteProductRej(err.message));
  }
};
export const getProductAsync = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const res = await getDoc(doc(db, "products", id));
    dispatch(getProductSuc(res.data()));
  } catch (err) {
    dispatch(deleteProductRej(err.message));
  }
};
export const updateProductAsync = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    await updateDoc(doc(db, "products", data.id), data);
    dispatch(updateProductSuc(data));    
  } catch (err) {
    dispatch(deleteProductRej(err.message));
  }
};


