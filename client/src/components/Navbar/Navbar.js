import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles'
import Collectors from '../../img/CollectorsLogo.png'
import decode from 'jwt-decode';

const Navbar = () => {
	const classes = useStyles();

	const[user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();


	const logout = () => {
		dispatch({ type: actionType.LOGOUT });
		history.push('/');
		setUser(null);
	}

	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = decode(token);

			if(decodedToken.exp * 1000 < new Date().getTime()) logout();
		}

		setUser(JSON.parse(localStorage.getItem('profile')))
	}, [location]);

	return (
		<AppBar className={classes.appBar} position='static' color='inherit'>
			<Link to='/' className={classes.brandContainer}>
				<img className={classes.image} src={Collectors} alt='logo' height='60' size='large' />
			</Link>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
						<Link to='/profile'>
							<Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
						</Link>
						<Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
					</div>
				) : (
					<Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
				)}
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
