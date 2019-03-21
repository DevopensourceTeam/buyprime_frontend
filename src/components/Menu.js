import React from 'react';
import {Link} from 'react-router-dom';

const RegistredMenu = (props) => {
	return (
		<li className="nav-item">
			<Link to="/">
				<label className="mb-0 pl-2 pr-2 c-pointer">
					{props.user.firstname}{props.user.lastname}</label>
			</Link>
		</li>
	);
};

const UnregistredMenu = () => {
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
					<RegistredMenu user={props.user} />
					: <UnregistredMenu />
			}
		</ul>
	);
};

export default AMenu;
