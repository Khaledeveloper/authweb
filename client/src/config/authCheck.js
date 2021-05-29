import React , {Component} from 'react';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions';
import * as calls from '../store/actions/axiosCalls'
import { connect } from 'react-redux';

class AuthCheck extends Component {
	
	constructor(props) {
    super(props);
    
    this.state = {
      
    }
  }
  
async authCheck (){
  console.log("from AuthCheck 2");
  	try{
    const response = await calls.postDataHeaderAuth('/api/user/refreshToken',{ token: this.props.token}, this.props.RefreshToken )
    console.log("resAuth" +response.status );
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

  async componentDidMount (){
    //await this.authCheck()
    await this.props.authCheck(this.props.token,this.props.RefreshToken)
  }

  render() {
    return this.props.children
  }
}



const mapDispatchToProps = dispatch => ({
 // addItem: item => dispatch(actions.addItem(item)),
  //addItemToCartItem: (item, items) => dispatch(actions.addItemToCartItem(item, items)),
  logout: () => dispatch(actions.logout()),
  authCheck: async (token, refreshToken) => dispatch(actions.authCheck(token,refreshToken)),

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


