import React from 'react';
import {Link} from 'react-router-dom';

/**
 * @class Header
 */
class Header extends React.Component {
	/**
	 * @function render
	 * @return {JSX} JSX del Header
	 */
	render() {
		return (
			<nav className="p-3 mb-3 d-flex justify-content-around shadow-sm">
				<section>
					<Link to="/" className="nav-brand">
						<label className="mb-0 c-pointer">{this.props.appName}</label>
					</Link>
				</section>
				<section>
					<img src="" alt="Logo de la página" />
				</section>
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
				</ul>
			</nav>
		);
	}
}

export default Header;
