import './Header.css';
import logo from '../../assets/night/logo.svg';
import avatar from '../../assets/night/avatar.png';
import subMenu from '../../assets/menuIcon.png';
import closeIcon from '../../assets/closeIcon.png';
import { useState } from 'react';

function Header({ handleAddClick, weatherData, setMobileView, mobileView }) {
	const currentDate = new Date().toLocaleString('default', {
		month: 'long',
		day: 'numeric',
	});

	return (
		<header className='header'>
			<div className='header_logo_and_location'>
				<img className='header__logo' src={logo} alt='logo' />
				<p className='header__date-and-location'>
					{currentDate}, {weatherData.city}
				</p>
			</div>
			<div className='mobile_view_menu'>
				<button className='submenu' onClick={() => setMobileView(true)}>
					<img src={subMenu} alt='submenu' />
				</button>
				{mobileView && (
					<div className='mobile_menu'>
						<button
							className='submenu_close'
							onClick={() => setMobileView(false)}
						>
							<img
								src={closeIcon}
								alt='close'
								className='mobileClose'
							/>
						</button>
						<div className='mobileView__user-container'>
							<p className='header__username'>Terren Tegegne</p>
							<img
								src={avatar}
								alt='Terren Tegegne'
								className='header__avatar'
							/>
						</div>
						<button
							onClick={handleAddClick}
							type='button'
							className='header__add-clothes-btn'
						>
							+ Add clothes
						</button>
					</div>
				)}
			</div>
			<div className='header_menu_content'>
				<button
					onClick={handleAddClick}
					type='button'
					className='header__add-clothes-btn'
				>
					+ Add clothes
				</button>
				<div className='header__user-container'>
					<p className='header__username'>Terren Tegegne</p>
					<img
						src={avatar}
						alt='Terren Tegegne'
						className='header__avatar'
					/>
				</div>
			</div>
		</header>
	);
}
export default Header;
