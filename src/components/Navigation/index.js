import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    }
}));

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => {
    const classes = useStyles();
    return (<div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Button color="inherit" href={ROUTES.LANDING}>Firebase + React</Button>
                </Typography>
                <Link to={ROUTES.LANDING} exact={true}><Button color="inherit">Landing</Button></Link>
                <Link to={ROUTES.HOME}><Button color="inherit">Home</Button></Link>
                <Link to={ROUTES.ACCOUNT}><Button color="inherit">Account</Button></Link>
                <Link to={ROUTES.ADMIN}><Button color="inherit">Admin</Button></Link>
                <SignOutButton />
            </Toolbar>
        </AppBar>
    </div>
    );
}

const NavigationNonAuth = () => {
    const classes = useStyles();
    return <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Button color="inherit" href={ROUTES.LANDING}>Firebase + React</Button>
                </Typography>
                <Link to={ROUTES.SIGN_IN}><Button color="inherit">Sign In</Button></Link>
            </Toolbar>
        </AppBar>
    </div>
};

export default Navigation;