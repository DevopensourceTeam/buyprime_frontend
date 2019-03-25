import React from 'react';

/**
 * @function SideBar
 * @param {Object} props
 * @return {JSX}
 */
const SideBar = (props) => {
	const classVar = props.stateSidebar ? 'normalSideBar' : 'smallSideBar';
	return (
		<article className={'border sidebar ' + classVar} >
			{
				props.stateSidebar ? <section
					onClick={() => props.showSidebar(false)}
					className="p-1 text-center border-bottom changeSideBar c-pointer">
					<span><i className="fas fa-caret-left"></i></span>
				</section>
					: <section
						onClick={() => props.showSidebar(true)}
						className="p-1 text-center border-bottom changeSideBar c-pointer">
						<span><i className="fas fa-caret-right"></i></span>
					</section>
			}
			{
				props.stateSidebar ?
					<p className="p-2 text-center border-bottom small popularChannels">
						Populars Channels</p>
					: ''
			}
			<section className="m-2">
				<section className="mt-1 mb-1 d-flex">
					<img className="sidebarImg"
						src="https://pbs.twimg.com/profile_images/895949432054796288/bEwXlvhK_400x400.jpg"
						alt="Logo Peluchitos"/>
					{
						props.stateSidebar ?
							<section className="ml-2 descriptionSidebar">
								<p className="mb-1">Peluchitos Amorosos</p>
								<p className="m-0 small">Conejo Amoroso</p>
							</section>
							: ''
					}
				</section>
			</section>
		</article>
	);
};

export default SideBar;
