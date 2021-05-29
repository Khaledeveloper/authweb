import * as actionTypes from './types';


const DEFAULT_STATE = {
  authErrors : {} 
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {

    case actionTypes.AUTH_FAIL:
      return { ...state, authErrors: actions.errors}
case actionTypes.AUTH_SUCCESS:
      return { ...state, authErrors: {}}


    default:
      return state
  }
}