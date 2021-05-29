import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
    root: {
        flexGrow: 1,
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {

    const classes = useStyles();
    const [value, setValue] = useState(0);

    useEffect(() => {

        if (window.location.pathname === '/account') {
            setValue(1)
        } else if (window.location.pathname === '/cart') {
            setValue(2)
        }

    }, [value])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <Tabs
                        value={value} onChange={handleChange}
                        indicatorColor="primary"
                    >
                        <Tab icon={<HomeIcon />}
                            classes={classes.tab}
                            component={Link}
                            to='/'
                        />
                        <Tab
                            icon={<AccountCircleIcon />}
                            classes={classes.tab}
                            component={Link}
                            to='/account'
                        />
                        <Tab icon={<CartIcon />}
                            classes={classes.tab}
                            component={Link}
                            to='/cart'
                        />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </div>
    );
}