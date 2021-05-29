import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const InputText = (props) => {
  
    const { input: { value, onChange } } = this.props;
    return (
      
        <TextField 
          variant="outlined"
          name={ this.props.name }
          id={ this.props.id }
          label={ this.props.name }
         classes="inputText" 
          type={ this.props.type }
          value={ props => props.contolled ? value : props.val}
          onChange={ props => props.contolled ? onChange : props.change }
          required   
           />
     
    );
  
}

export default InputText