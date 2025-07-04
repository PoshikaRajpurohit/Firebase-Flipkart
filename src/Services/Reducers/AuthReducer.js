const initialState = {
  user: null,
  isCreated: false,
  isLogging: false,
  errorMSG: "",
  loading: true, 
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN_UP_SUC":
            return {
                ...state,
                isCreated: true
            }
        case "SIGN_IN_SUC":
            return {
            ...state,
            user: action.payload,
            isCreated: false,
            errorMSG: ""
            };
        case "SIGN_OUT_SUC":
            return {
                ...state,
                isCreated: false,
                user: null
            }
        case "ERROR": 
        return {
            ...state,
            errorMSG: action.payload
        }
        case "AUTH_CHECK_DONE":
  return {
    ...state,
    loading: false,
  };
       
        default:
            return state;
    }
}
export default authReducer;