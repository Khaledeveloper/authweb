import React, { Component } from 'react';
import  './inputAdminForm.scss';
export default class CustomInput extends Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }


  onChange(e) {
    //this onchage we use if we want to get files in formData
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
    console.log("eee"+e.target.files);
  }

  render() {
    // const { input: { value, onChange } } = this.props;
    return (
      
      <div className="form-group-admin">
        
        <label htmlFor={ this.props.id } className="label-input-admin">{ this.props.label }</label>
       <input 
          name="upload"
          id={ this.props.id }
         /* placeholder={ this.props.placeholder } */
          className="inputText-admin"
          type='file'
         // value={ value }
          onChange={this.props.change}
         required   
         multiple
           /> 
  
      </div>
    );
  }
}