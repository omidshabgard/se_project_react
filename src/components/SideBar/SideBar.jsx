import { useState, useContext } from 'react';
import avatar from '../../assets/night/avatar.png';
import './SideBar.css';
import UpdateUserModal from '../UpdateUserModal';
import { checkToken } from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { StateContext } from '../../contexts/StateContext.js';

function SideBar({
	handleLogout,
	handleAddClick,
	activeSection,
	setActiveSection,
}) {
	const { currentUser } = useContext(CurrentUserContext);
	const { setCurrentUser } = useContext(StateContext);

	const [isUpdateOpen, setIsUpdateOpen] = useState(false);
	const [isLogoutOpen, setIsLogoutOpen] = useState(false);

	const openUpdateModal = () => setIsUpdateOpen(true);
	const closeUpdateModal = () => setIsUpdateOpen(false);

	const openLogoutModal = () => setIsLogoutOpen(true);
	const closeLogoutModal = () => setIsLogoutOpen(false);

	const handleUpdateUser = () => {
		const token = localStorage.getItem('token');

		if (token) {
			checkToken(token)
				.then((userData) => {
					setCurrentUser(userData);
				})
				.catch((err) => {
					console.error('Failed to fetch updated user data:', err);
				});
		} else {
			console.error('No token found, please log in.');
		}
	};

	const handleUserUpdateSuccess = () => {
		handleUpdateUser();
		closeUpdateModal();
	};

	const confirmLogout = () => {
		closeLogoutModal();
		handleLogout();
	};

	return (
		<>
			<aside className='flex min-h-[620px] w-[240px] flex-col'>
				{/* USER */}
				<div className='mb-8 flex items-center gap-4'>
					<img
						src={currentUser ? currentUser.avatar : avatar}
						alt={currentUser ? currentUser.name : 'User'}
						className='h-14 w-14 rounded-full object-cover'
					/>

					<span className='text-xl font-bold'>
						{currentUser ? currentUser.name : 'User'}
					</span>
				</div>

				{/* MENU */}
				<nav className='flex flex-col gap-2'>
					<button
						type='button'
						onClick={() => setActiveSection('my-items')}
						className={`rounded-lg px-3 py-3 text-left text-base transition ${
							activeSection === 'my-items'
								? 'bg-gray-100 font-semibold'
								: 'hover:bg-gray-100'
						}`}
					>
						My Items
					</button>

					<button
						type='button'
						onClick={() => setActiveSection('favorites')}
						className={`rounded-lg px-3 py-3 text-left text-base transition ${
							activeSection === 'favorites'
								? 'bg-gray-100 font-semibold'
								: 'hover:bg-gray-100'
						}`}
					>
						Favorites
					</button>

					<button
						type='button'
						onClick={handleAddClick}
						className='rounded-lg px-3 py-3 text-left text-base transition hover:bg-gray-100'
					>
						Add New Item
					</button>

					<button
						type='button'
						onClick={openUpdateModal}
						className='rounded-lg px-3 py-3 text-left text-base transition hover:bg-gray-100'
					>
						Profile Settings
					</button>

					<button
						type='button'
						onClick={() => setActiveSection('activity')}
						className={`rounded-lg px-3 py-3 text-left text-base transition ${
							activeSection === 'activity'
								? 'bg-gray-100 font-semibold'
								: 'hover:bg-gray-100'
						}`}
					>
						Activity
					</button>
				</nav>

				{/* LOGOUT */}
				<button
					type='button'
					onClick={openLogoutModal}
					className='mt-auto border-t border-gray-300 px-3 pt-5 text-left font-semibold transition hover:text-red-600'
				>
					Log out
				</button>
			</aside>

			{/* UPDATE PROFILE */}
			{isUpdateOpen && (
				<UpdateUserModal
					isOpen={isUpdateOpen}
					onClose={closeUpdateModal}
					onUpdateSuccess={handleUserUpdateSuccess}
					initialName={currentUser ? currentUser.name : ''}
					initialAvatar={currentUser ? currentUser.avatar : ''}
				/>
			)}

			{/* LOGOUT CONFIRMATION */}
			{isLogoutOpen && (
				<div
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'
					onClick={closeLogoutModal}
				>
					<div
						className='w-full max-w-[400px] rounded-2xl bg-white p-7 shadow-2xl'
						onClick={(e) => e.stopPropagation()}
					>
						<h2 className='mb-3 text-2xl font-bold'>Log out</h2>

						<p className='mb-7 text-base text-gray-600'>
							Are you sure you want to log out?
						</p>

						<div className='flex justify-end gap-3'>
							<button
								type='button'
								onClick={closeLogoutModal}
								className='rounded-lg border border-gray-300 px-5 py-2.5 font-medium transition hover:bg-gray-100'
							>
								Cancel
							</button>

							<button
								type='button'
								onClick={confirmLogout}
								className='rounded-lg bg-black px-5 py-2.5 font-medium text-white transition hover:bg-gray-800'
							>
								Yes, Log out
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default SideBar;
