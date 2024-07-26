import './Header.css';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.png';

function Header({ handleAddClick }) {
	return (
		<header className='header'>
			<img className='header__logo' src={logo} />
			<p className='header__date-and-location'>DATE, LOCATION</p>
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

			<header></header>
		</header>
	);
}
export default Header;
