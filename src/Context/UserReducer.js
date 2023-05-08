export const initialState = {
    token: "",
    userData:{},
  };
  
  export const actionTypes = {
    SET_TOKEN: "SET_TOKEN",
    SET_USER:"SET_USER",
  
   
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.SET_TOKEN:
        return { ...state, token: action.value };
      case actionTypes.SET_USER:
        return {...state,userData:action.value};
      default:
        return state;
    }
  };
  
  export default reducer;