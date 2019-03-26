import React from 'react';
import {Link} from 'react-router-dom';

/**
 * @function RegisteredMenu
 * @desc When the user is registered in the app
 * @param {Object} props
 * @return {JSX}
 */
const RegisteredMenu = (props) => {
	return (
		<ul className="navbar-nav flex-row">
			<li className="nav-item">
				<Link to="/">
					<label className="mb-0 pl-2 pr-2 c-pointer">
						{props.user.firstname}{props.user.lastname}</label>
				</Link>
			</li>
			<li className="nav-item"
				onClick={() => props.logout()}>
				<label className="mb-0 pl-2 pr-2 c-pointer">
					<i className="fas fa-sign-out-alt"></i></label>
			</li>
		</ul>
	);
};

/**
 * @function UnRegisteredMenu
 * @desc When the user isn't registered in the app
 * @return {JSX}
 */
const UnregisteredMenu = () => {
	return (
		<ul className="navbar-nav flex-row">
			<li className="nav-item">
				<Link to="/login">
					<label className="mb-0 pl-2 pr-2 c-pointer">Sign In</label>
				</Link>
			</li>
			<label>or</label>
			<li className="nav-item">
				<Link to="/register">
					<label className="mb-0 pl-2 pr-2 c-pointer">
					Create an Account</label>
				</Link>
			</li>
		</ul>
	);
};
/**
 * @function AMenu
 * @desc Global menu of the application
 * @param {Object} props
 * @return {JSX}
 */
const AMenu = (props) => {
	return (
		<ul className="navbar-nav flex-row">
			<li className="nav-item">
				<Link to="/">
					<label className="mb-0 pl-2 pr-2 c-pointer">Inicio</label>
				</Link>
			</li>
			<li className="nav-item">
				<Link to="/video">
					<label className="mb-0 pl-2 pr-2 c-pointer">Video</label>
				</Link>
			</li>
			{
				props.user ?
					<RegisteredMenu user={props.user} logout={props.logout} />
					: <UnregisteredMenu />
			}
			<li className="nav-item">
				<Link to="/cart">
					<label className="mb-0 pl-2 pr-2 c-pointer">
						<label>{props.nproducts}</label>
						<i className="fas fa-shopping-cart"></i></label>
				</Link>
			</li>
		</ul>
	);
};

export default AMenu;
