const initialState = {
  products: [],
  product: null,
  isLoading: false,
  isCreated: false,   
  isUpdated: false,   
  errorMsg: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, 
        isLoading: true, 
        errorMsg: "" };
    case "ADD_PRODUCT_SUC":
      return {
         ...state, 
         isCreated: true, 
         isLoading: false };
    case "ADD_PRODUCT_REJ":

    case "DELETE_PRODUCT_REJ":
      return { 
        ...state, 
        errorMsg: action.payload, 
        isLoading: false };

    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        isCreated: false,
        isUpdated: false,
      };
    case "GET_PRODUCT_SUC":
      return { 
        ...state, 
        product: action.payload, 
        isLoading: false };
    case "UPDATE_PRODUCT_SUC":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
        product: null,
        isUpdated: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default productReducer;
