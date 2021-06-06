

import GTranslateIcon from '@material-ui/icons/GTranslate';
import FacebookIcon from '@material-ui/icons/Facebook';
import React, { useState, useEffect } from "react";
import { reduxForm, Field } from 'redux-form';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import InputForm from './input';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid, Paper, Backdrop,
  CircularProgress, Button
  , Alert, MenuItem
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({


  form: {

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',

      '& fieldset': {
        borderColor: 'gray',
      },
      '&:hover fieldset': {
        //borderColor: 'yellow',
      },



    },


  },

  formTitle: {
    margin: '0 auto'
  },
  Paper: {
    padding: '40px'
  }



}));



const Form = (props) => {
  const classes = useStyles();
  //const [loading, setLoading] = useState(props.LoadingBtn) 



  useEffect(() => {
    props.removeErr()

  }, [])



  const { handleSubmit } = props;
  return (

    <Paper elevation={3} className={classes.Paper}>

      <form onSubmit={handleSubmit(props.onSubmit)}>
        {props.fieldsets.map((field, i) =>
          <fieldset key={field.name + field.label + i}>
            <Field
              type={field.type}
              name={field.name}
              id={field.id}
              classN={props.classN}
              placeholder={field.placeholder}
              component={InputForm}
              label={field.label}
              labelClass={props.labelClass}
            />
          </fieldset>
        )}

        {props.errors && <> </>}

        {/* {props.errors ? <>
         { for (const [key, value] of Object.entries(errors)) {
            <Alert severity="error" key={key + value + 'formError'} >{value} </Alert>
          } }</> : null} */}
        <Button type="submit" variant="contained" color="primary">
          {props.submitBtnTitle}
        </Button>

        <Backdrop className={classes.backdrop} open={props.Loading} >
          <CircularProgress color="inherit" />
        </Backdrop>
      </form>


      {props.signin && props.social ?
        <div className="ToSignUp">
          <h5> {props.ToSignUp}</h5>
          <Link to={props.signupLink} >{props.signup_title} </Link>
        </div>
        : null}

      {props.responseFacebook ?

        <FacebookLogin
          appId="707125976663072"
          textButton="Facebook"
          render={renderProps => (
            <img alt="FB" className="fb-btn" src={FacebookIcon} onClick={renderProps.onClick} />
          )}
          fields="name,email,picture"
          callback={props.responseFacebook}
          isMobile={false}
          disableMobileRedirect={true}


        /> : null}

      {props.responseGoogle ?
        <GoogleLogin
          clientId="682621113652-hrspt3l9krupdvsk3gib2nqvdsn20i8m.apps.googleusercontent.com"
          buttonText='Google'
          render={renderProps => (
            <img alt="Google" className="google-btn" src={GTranslateIcon} onClick={renderProps.onClick} disabled={renderProps.disabled} />
          )}
          isSignedIn={false}

          onSuccess={props.responseGoogle}
        //  onFailure={props.googleres}

        />

        : null}




      {/* </div> */}

    </Paper>




  );

}


export default reduxForm({ form: 'form' })
  (Form)