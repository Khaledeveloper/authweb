import React, { Component } from 'react';
//import InputCss from './inputFrom.css';
export default class CustomInput extends Component {
  render() {
    const { input: {
      // value,
      onChange } } = this.props;
    return (
      <div className="form-group-select">
        <label htmlFor={this.props.id} className={this.props.className}>{this.props.label}</label>
        <select name={this.props.name}
          id={this.props.id}
          /* placeholder={ this.props.placeholder } */
          className={this.props.classNs}


          onChange={onChange}
          required
        >

          <option></option>
          {this.props.options.map((s) => {

            return <option value={s.value}>{s.option}</option>

          })}




        </select>
      
      </div>
    );
  }
}