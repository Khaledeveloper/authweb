import React, { Component } from 'react';
import './inputAdminForm.scss';
export default class CustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      
      <div className="form-group-admin">
        
        <label htmlFor={ this.props.id } className="label-input-admin">{ this.props.label }</label>
       <input 
          name={ this.props.name }
          id={ this.props.id }
         /* placeholder={ this.props.placeholder } */
          className="inputText-admin"
          type={ this.props.type }
          value={ value }
          onChange={ onChange }
        // required   
          oninvalid="this.setCustomValidity('The Field can not be Empty ')"
    oninput="this.setCustomValidity('')"  /> 
  
      </div>
    );
  }
}