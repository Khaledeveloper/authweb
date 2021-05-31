import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Grid} from '@material-ui/core';
import randomColor from 'randomcolor';
 
const useStyles = makeStyles((theme) => ({
    form: {
        margin: "0 auto",
        
    }
}));
const Register = (props) => {
    const classes = useStyles();
    return(
    <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}
>

  <Grid item xs={3} style={{background:randomColor()}}>
    <form  noValidate autoComplete="off">
        <TextField id="outlined-basic" 
        label="Outlined"
         variant="outlined" />
        </form>
  </Grid>   

</Grid> 
    
    
       
        
        
    
    )
}

export default Register