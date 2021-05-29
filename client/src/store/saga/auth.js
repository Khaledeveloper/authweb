import * as actions from '../actions'
import * as APIs from '../actions/APIs'
import * as actionTypes from "../types";
import * as calls from './axiosCalls.js'
import { put, call, select} from 'redux-saga/effects'
import {selectLang} from '../reducers/langReducer/langsReselect.js' 




export function* authUserSaga(data) {
	const lang = yield select(selectLang);
	
  yield put(actions.authStart());
  
  let url = APIs.USER_POST_SIGNUP

  if (data.action === "login") {
    url = APIs.USER_POST_LOGIN

  }
  if (data.action === "updateuser") {
    url = APIs.USER_POST_UPDATE

  }
  if (data.action === 'goauth') {
    url = APIs.USER_POST_GOOGLE_OAUTH
  }

  if (data.action === 'fbauth') {
    url = APIs.USER_POST_FB_OAUTH
  }
  try {
    
    let response = ''
        if (data.action === "updateuser") {
      response = yield call(calls.postDataHeaderAuth, url, data.data, data.token)
    }else{
    	response = yield call(calls.postData, url, data.data)
   } 
    

yield put(
      actions.authSuccess(
         response.data.user
      )
    );


//merge localCart when user Logged
try{

const mergeRes = yield call(calls.postDataHeaderAuth, APIs.CART_POST_MERGE, {products: data.cartItems} , response.data.token)

//remove localCart when merging is done

	yield put({
type: actionTypes.CLEAR_LOCAL_CARTITEMS
}) 
	




} catch(e) {


} 


    
    // yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    if (data.action === "updateuser") {
      return yield put(actions.updateUserFail(error.response.data.error_en));

    }
    
    if(lang =="en") {

    yield put(actions.authFail(error.response.data.error_en));
  } else if (lang =='ar') {
  	yield put(actions.authFail(error.response.data.error_ar));

} 
  }
}


export function* logoutSaga(action) {
  yield put(actions.logoutSucceed());
}