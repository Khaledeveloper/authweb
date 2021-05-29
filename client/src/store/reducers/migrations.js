export const migrations = {
  0: state => {
    return {
      ...state,
      userAuth: {
        ...state.userAuth,
        authUser:{...state.userAuth.authUser, updatedError: '' }
      },
    };
  },
  
  1: state => {
    return {
      ...state,
      langsReducer: {
        ...state.langsReducer,
        set: false
      },
    };
  },


  2: state => {
    return {
      ...state,
      userAuth: {
        ...state.userAuth,
        authUser:{...state.userAuth.authUser, refreshToken:'' }
      },
    };
  },





};