import React, { useState, useEffect} from 'react';
import { reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
//import { selectTermsLang } from '../../../store/reducers/langReducer/langsReselect';
//import * as actions from '../../../store/actions/users.js';
import * as actions from '../../store/actions';
//import { selectCartItems } from '../../../store/reducers/cart/cartReselect';
import Form from '../form/form';
const SignIn = (props) => {

  useEffect(() => {
  if (props.checkoutRedirectLink) {
        const link = props.checkoutRedirectLink
        props.chechoutRedirectDone()
        props.history.push(link);
      } else {

        props.history.push('/');
      }


    
}, [props.isAuthenticated]) 
  
const  onSubmit =  (formData) => {
    props.signInAuth(formData, "login", props.cartItems)
  }


  const responseGoogle = (res) => {
    props.signInAuth({ access_token: res.accessToken }, "goauth", props.cartItems)
  }

  const responseFacebook = (res) => {
    
    props.signInAuth({
      accessToken: res.accessToken,
      id: res.id,
      email: res.email
    }, "fbauth", props.cartItems)
  }

 
 const fieldsets = [

    {
      type: "text",
      name: "email",
      ID: "email",
      className: props.classN,
      placeholder: props.emailString,
      label: props.emailString
    },
    {
      type: "password",
      name: "password",
      ID: "password",
      className: props.classN,
      placeholder: props.passwordString,
      label: props.passwordString
    }



  ]




  
    
    return (

      <div class="main-container-auth">
        <Form
          title={props.signin_title}
          fieldsets={fieldsets}
          classN="juv-input-form-set"
          labelClass="input-label"
          social={true}
          onSubmit={onSubmit}
          errorMsg={props.errorMsg}
          fbres={responseFacebook}
          googleres={responseGoogle}
          submitBtnTitle={props.submit_signin_btn}
          signin={true}
          signupLink="/authnav/signup"
          ToSignUp={props.ToSignUp}
          signup_title={props.signup_title}
          removeErr={props.authLeft}
          LoadingBtn={props.Loading}
        />
      </div>




    );
  
}

const mapStateToProps = state => {
  return {
    Loading: state.userAuth.authUser.Loading,
    checkoutRedirectLink: state.redirectAuthReducer.authLink,
    errorMsg: state.userAuth.authUser.error,
    name: state.userAuth.authUser.name,
    token: state.userAuth.authUser.token,
    isAuthenticated: state.userAuth.authUser.isAuthenticated,
    submit_signin_btn: selectTermsLang(state).submit_signin_btn,
    signin_title: selectTermsLang(state).signin_title,
    emailString: selectTermsLang(state).email,
    passwordString: selectTermsLang(state).password,
    classN: selectTermsLang(state).classN,
    ToSignUp: selectTermsLang(state).ToSignUp,
    cartItems: selectCartItems(state),
    signup_title: selectTermsLang(state).signup_title
  }

}

const mapDispatchToProps = dispatch => {
  return {

    chechoutRedirectDone: () => dispatch(actions.chechoutRedirectDone()),
    signInAuth: (data, action, cartItems) => dispatch(actions.auth(data, action, cartItems)),
    authLeft: () => dispatch(actions.authLeft())
    //  onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'signin' })
)(signIn)