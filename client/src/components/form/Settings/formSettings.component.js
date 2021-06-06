import './formSettings.scss';
// import { withRouter } from 'react-router-dom';
// import * as RouterDom from 'react-router-dom';

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import InputForm from './inputSettingsForm.js';
// import InputFormPhone from './inputSettingsPhone'
// import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Link } from 'react-router-dom';

class Form extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  async onSubmit(formData) {


   this.props.onSubmit(formData) 
  }

  
  componentDidMount() {
    this.props.setVal()
    
      this.props.removeErr()
    
  }
  componentDidUpdate() {
    this.props.setVal()
  }
  
   componentWillUnmount() {
    
      this.props.removeErr()
    
  }

  render() {
    const { handleSubmit } = this.props;
    return (

      
        







        <div class="form-container-userSettings">
          <Link class="logo-pic-form" to="/" />
          
          <h4 class="form-title"> {this.props.title} </h4>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            
                 { this.props.fieldsets.map((field) => 
                 <div className="fieldset-container">
             <fieldset>
              <Field
                type={field.type}
                name={field.name}
                id={field.id}
                className={field.className}
                placeholder={field.placeholder}
                component={InputForm}
                label={field.label}
               val={field.val}
                change={field.change}
              />
            </fieldset>
            </div>
                    )} 

            {/* <fieldset>
              <Field
                
                name="phone" 
                id="phone" 
                className={this.props.classNamePhone}
                placeholder={this.props.placeholderPhone}
                component={InputFormPhone}
                label={this.props.labelPhone}
               val={this.props.valPhone}
                change={this.props.changePhone}
              />
            </fieldset> */}

{this.props.errorMsg ? <div className="errorMsg">{this.props.errorMsg }</div> : null  }

{!this.props.LoadingBtn ?
            <button type="submit" class="custum-btn-form">{this.props.submitBtnTitle}</button>
            : <div className="loadingBtnDiv"><div className="loaderbTn"/></div>}
          </form>
         
         
          




        </div>

      




    );
  }
}


export default reduxForm({ form: 'form' })
(Form)