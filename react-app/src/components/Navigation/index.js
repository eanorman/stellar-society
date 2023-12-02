import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/logo-color.png'
import SearchBar from '../SearchBar';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-list'>
			<li className='logo'>
				<NavLink exact to="/"><img src={logo} alt='Stellar Society Logo' /></NavLink>
			</li>
			{ isLoaded && sessionUser && (
				<SearchBar />
			)

			}
			{isLoaded && (
				<li className='profile'>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
