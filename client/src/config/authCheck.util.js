import React , {Component} from 'react';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions';
import * as calls from '../store/actions/axiosCalls'
import { connect } from 'react-redux';

const AuthCheck = async() => {
	
	

  console.log("from AuthCheck 2");
  	try{
    const response = await calls.postDataHeaderAuth('/api/user/refreshToken',{ token: this.props.token}, this.props.RefreshToken )
    console.log("resAuth newww" +response.status );
    if(response.status== 201) {
      console.log("status created");
      console.log("res token "+JSON.stringify(response) );
await this.props.refreshToken(response.data.token, response.data.refreshToken)
   } 
   } catch(e) {
     console.log("e" +e.response.data.error);
this.props.logout()
} 


  
}



const mapDispatchToProps = dispatch => ({
 // addItem: item => dispatch(actions.addItem(item)),
  //addItemToCartItem: (item, items) => dispatch(actions.addItemToCartItem(item, items)),
  logout: () => dispatch(actions.logout()),
  favoriteListAction: (token,refreshToken) => dispatch(actions.fetchFavorites(token,refreshToken)),
  refreshToken: (token, refreshToken) => dispatch(actions.refreshToken(token,refreshToken)),
});

const mapStateToProps = (state) => {
  return {
    
    token: state.userAuth.authUser.token,
    RefreshToken: state.userAuth.authUser.refreshToken,
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck);


