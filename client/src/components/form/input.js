import React from 'react';
import { Grid, Menuitem, TextField} from '@material-ui/core';

const CustomInput = (props) =>{
  
    const { input: { value, onChange } } = props;
    
    const TextInput = (
    <Grid item xs={props.xs} md={props.md}>
    <TextField 
 label="Email"
 variant="outlined"
name={ props.name }
  id={ props.id }
  type={ props.type }
  onChange={ props.onChangeProp ? props.onChangeProp : onChange }
  value={props.valueProp ? props.valueProp : value}
/>
    </Grid>
    
   ) 
   
   const SelectInput = (
    <Grid item xs={props.xs} md={props.md}>
    <TextField 
    select
 label = {props.label}
 variant="outlined"
name={ props.name }
  id={ props.id }
  type={ props.type }
  onChange={ props.onChangeProp ? props.onChangeProp : onChange }
  value={props.valueProp ? props.valueProp : value}>
  {props.option.map((option) => (
            <MenuItem key={option.value + 'formComponent' } value={option.value}>
              {option.label}
            </MenuItem>
          ))}
  </TextField>
    </Grid>
    
   ) 
    
    
    return (
      <>
      {props.options ?  SelectInput : TextInput} 
      </>
    );
  
}

export default CustomInput