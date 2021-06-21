export const authReducer = (state, action) => {
  const { payload } = action;
  
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        isUserLoggedIn: payload ? true : false,
        user: payload
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isUserLoggedIn: false,
        user: {}
      };
    }

    default:
      return state;
  }
};
