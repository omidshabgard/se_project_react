import { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar';
import './Profile.css';
import ClothesSection from '../ClothesSection/ClothesSection';

function Profile({ handleAddClick, handleLogout }) {
	const [activeSection, setActiveSection] = useState(() => {
		return localStorage.getItem('activeProfileSection') || 'my-items';
	});

	useEffect(() => {
		localStorage.setItem('activeProfileSection', activeSection);
	}, [activeSection]);

	return (
		<div className='profile'>
			<section className='profile__sideBar'>
				<SideBar
					handleLogout={handleLogout}
					handleAddClick={handleAddClick}
					activeSection={activeSection}
					setActiveSection={setActiveSection}
				/>
			</section>

			<section className='profile__clothSection'>
				<ClothesSection
					handleAddClick={handleAddClick}
					activeSection={activeSection}
				/>
			</section>
		</div>
	);
}

export default Profile;
