import React, { Component } from 'react';
import  './inputFrom.css';
export default class CustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={ this.props.id } className={ this.props.labelClass}>{ /*this.props.label*/ }</label>
        <textarea 
          name={ this.props.name }
          id={ this.props.id }
         /* placeholder={ this.props.placeholder } */
          className={this.props.classN}
          
          cols={35}
          value={ value }
          onChange={ onChange }
          placeholder={this.props.label}
         /*required   */
          // onInvalid="this.setCustomValidity('The Field can not be Empty ')"
          // onInput="this.setCustomValidity('')" 
          
          />
      </div>
    );
  }
}