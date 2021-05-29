import React from 'react'
import InputText from './input';
import { Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

/**
* @Khaled
* @function Form
**/

const Form = (props) => {
  return(
    <>
    {props.isLoading && : <Backdrop />}
            
            
<form onSubmit={handleSubmit(this.onSubmit)}>
          {this.props.fieldsets.map((field) =>
            <fieldset>
              <Field
                type={field.type}
                name={field.name}
                id={field.id}
                classN={this.props.classN}
                placeholder={field.placeholder}
                component={  Input-text }
                label={field.label}
                labelClass={this.props.labelClass}
              />
            </fieldset>
          )}
{props.errors && 
for (const [key, value] of Object.entries(errors)) {
           <div className="errorMsg">{value}</div> 
        } }

    
          
            <Button type="submit" variant="contained" color="primary">{props.submitBtnTitle}</Button>
            

        </form>

</>


   )

 }

export default Form