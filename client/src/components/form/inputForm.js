import React, { Component } from 'react';
import   './input.scss';
export default class CustomInput extends Component {
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <div className="user-input-wrp">
        <label htmlFor={ this.props.id } className={ this.props.labelClass}>{ /*this.props.placeholder*/}</label>
        <input 
          name={ this.props.name }
          id={ this.props.id }
         /* placeholder={ this.props.placeholder } */
          className={this.props.classN}
          type={ this.props.type }
          value={ value }
          onChange={ onChange }
          // placeholder={}
          
          oninvalid="this.setCustomValidity('The Field can not be Empty ')"
    oninput="this.setCustomValidity('')"  />
    <span className="floating-label">{this.props.label}</span>
    </div>
    );
  }
}