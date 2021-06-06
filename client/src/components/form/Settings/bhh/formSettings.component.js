import Style from './formSettings.scss';
import { withRouter } from 'react-router-dom';
import * as RouterDom from 'react-router-dom';

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InputForm from './inputSettingsForm.js';


import { Link } from 'react-router-dom';

class Form extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  async onSubmit(formData) {


   this.props.onSubmit(formData) 
  }

  
  

  render() {
    const { handleSubmit } = this.props;
    return (

      
        







        <div class="form-container-form">
          <Link class="logo-pic-form" to="/" />
          
          <h4 class="form-title"> {this.props.title} </h4>
          <form onSubmit={handleSubmit(this.onSubmit)}>
                 { this.props.fieldsets.map((field) => 
             <fieldset>
              <Field
                type={field.type}
                name={field.name}
                id={field.id}
                className={field.className}
                placeholder={field.placeholder}
                component={InputForm}
                label={field.label}
                value={field.value}
              />
            </fieldset>
                    )} 

            

{this.props.errorMsg ? <div className="errorMsg">{this.props.errorMsg }</div> : null  }


            <button type="submit" class="custum-btn-form">{this.props.submitBtnTitle}</button>
            
          </form>
         
         
          




        </div>

      




    );
  }
}


export default reduxForm({ form: 'form' })
(Form)