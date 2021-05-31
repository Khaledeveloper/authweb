import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
    form: {
        margin: "0 auto",
        
    }
}));
const Register = (props) => {
    const classes = useStyles();
    return(
       
        <form  noValidate autoComplete="off">
        <TextField id="outlined-basic" 
        label="Outlined"
         variant="outlined" classes={classes.form}/>
        </form>
        
    
    )
}

export default Register