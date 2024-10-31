import SideBar from '../SideBar/SideBar';
import './Profile.css';
import ClothesSection from '../ClothesSection/ClothesSection';

function Profile({ handleAddClick, handleLogout }) {
	return (
		<div className='profile'>
			<section className='profile__sideBar'>
				<SideBar handleLogout={handleLogout} />
			</section>
			<section className='profile__clothSection'>
				<ClothesSection handleAddClick={handleAddClick} />
			</section>
		</div>
	);
}

export default Profile;
