import * as actionTypes from "../types";



//this will fire saga 
export const auth = (data, action, cartItems) => {
  return {
    type: actionTypes.AUTH_USER,
    data: data,
    action: action, 
    cartItems :cartItems
  };
};



//isLoading
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};



// get user to reducer 
export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user 
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const refreshToken = (token, refreshToken) => {
  console.log("from refresh token" + token + refreshToken);
  return {

    type: actionTypes.REFRESH_TOKEN,
    refreshToken: refreshToken,
    token: token
  };
};




export const authLeft = () => {
  return {
    type: actionTypes.AUTH_USER_LEFT
  };
};

export const updateLeft = () => {
  return {
    type: actionTypes.UPDATE_USER_LEFT
  };
};


export const updateUserFail = error => {
  return {
    type: actionTypes.UPDATE_USER_FAIL,
    error: error
  };
};




export const updateUser = (data, action, token) => {
  return {
    type: actionTypes.AUTH_USER,
    data: data,
    action: action,
    token: token
  };
};

// export const authCheck = (token, refreshToken) => {
//   return async dispatch => {
//     console.log("before resAuth");
//     try {
//       const response = await calls.postDataHeaderAuth('/api/user/refreshToken', { token }, refreshToken)
//       console.log("resAuth v3" + response.status);
//       if (response.status === 201) {

//         dispatch({
//           type: actionTypes.REFRESH_TOKEN,
//           refreshToken: response.data.refreshToken,
//           token: response.data.token
//         });

//       }
//     } catch (e) {
//       console.log("e response" + e.response.status);
//       if (e.response.status === 500 || e.response.status === "500" ) {
//         console.log("SERVER ERROR");
//         return
//       }
//       console.log("e" + e.response.data.error);
//       dispatch({
//         type: actionTypes.AUTH_INITIATE_LOGOUT
//       });
//     }

//   };
// };


export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
export const logout = () => {

  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

