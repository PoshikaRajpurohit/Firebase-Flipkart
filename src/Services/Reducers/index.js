import { combineReducers } from "redux";
import productReducer from "./ProductReducer";
import cartReducer from "./CartReducer";
import authReducer from "./AuthReducer";
import orderReducer from "./OrderReducer";



const rootReducer = combineReducers({
   productReducer,
   cartReducer,
   authReducer,
   orderReducer
});

export default rootReducer;