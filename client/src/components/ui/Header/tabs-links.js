import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//icons
import MenuIcon from '@material-ui/icons/Menu';
import CartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'

import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
     tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    }
}));

export default function Tabs() {
	
	const tabs =[
	{
		link: '/cart', 
		icon: <CartIcon />
		} 
	
	] 
	
	

    const classes = useStyles();
    const [value, setValue] = useState(0);

    useEffect(() => {
    	props.tabs.map(tab=>{
    	let tabValue = tab.findIndex(tab => tab.link === window.location.pathname);
        setValue(tabValue)

})

    }, [value])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Tabs
                        value={value} 
                        onChange={handleChange}
                        indicatorColor="primary"
                    >
                    {props.tabs.map(tab=>{

<Tab icon={tab.icon}
                            classes={tab.classes}
                            component={Link}
                            to={tab.link}
                        />

              })}
                    
                    
                    
                        
                        
                    </Tabs>
    );
}