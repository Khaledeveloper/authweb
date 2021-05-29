import * as actionTypes from './types';

const DEFAULT_STATE = {
  user: {}, 
  isLoading: false,
  isAuthenticated: false,

}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {

    case actionTypes.AUTH_START:
      return { ...state, isLoading: true }
    case actionTypes.AUTH_SUCCESS:
      return { ...state, user: action.user, isLoading: false, isAuthenticated: true}
   case actionTypes.AUTH_FAIL:
      return { ...state, user: {},  isLoading: false, isAuthenticated: false} 
    case actionTypes.AUTH_LOGOUT:
      return { ...state, user: {},  isLoading: false, isAuthenticated: false} 
    
    default:
      return state
  }
}