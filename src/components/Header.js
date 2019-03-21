import React from 'react';
import {Link} from 'react-router-dom';
import AMenu from './Menu';

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
			<nav className="p-3 d-flex justify-content-around shadow-sm">
				<section>
					<Link to="/" className="nav-brand">
						<label className="mb-0 c-pointer">{this.props.appName}</label>
					</Link>
				</section>
				<section className="text-center">
					<img src="logo.svg" alt="Page logo" width="16%" />
				</section>
				<AMenu user={this.props.user} logout={this.props.logout}/>
			</nav>
		);
	}
}

export default Header;
