import { useContext } from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import { ItemContext } from '../../contexts/ItemsContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ClothesSection({ handleAddClick, activeSection }) {
	const { clothItems } = useContext(CurrentTemperatureUnitContext);
	const { handleCardClick } = useContext(ItemContext);
	const { currentUser } = useContext(CurrentUserContext);

	const currentUserItems = clothItems?.filter(
		(item) => currentUser && item.owner === currentUser._id,
	);

	const favoriteItems = clothItems?.filter(
		(item) => currentUser && item.likes?.includes(currentUser._id),
	);

	const recentItems = [...(currentUserItems || [])]
		.sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt);
		})
		.slice(0, 5);

	if (activeSection === 'activity') {
		return (
			<div className='w-full'>
				<h2 className='mb-7 text-2xl font-bold'>Activity</h2>

				{/* SUMMARY CARDS */}
				<div className='mb-8 grid grid-cols-2 gap-5'>
					<div className='rounded-xl bg-white p-6 shadow-sm'>
						<p className='text-sm text-gray-500'>My Items</p>

						<p className='mt-2 text-3xl font-bold'>
							{currentUserItems?.length || 0}
						</p>
					</div>

					<div className='rounded-xl bg-white p-6 shadow-sm'>
						<p className='text-sm text-gray-500'>Favorites</p>

						<p className='mt-2 text-3xl font-bold'>
							{favoriteItems?.length || 0}
						</p>
					</div>
				</div>

				{/* RECENT ACTIVITY */}
				<div className='rounded-xl bg-white p-6 shadow-sm'>
					<h3 className='mb-5 text-xl font-bold'>Recently Added</h3>

					{recentItems.length === 0 ? (
						<p className='text-gray-500'>No activity yet.</p>
					) : (
						<div className='flex flex-col'>
							{recentItems.map((item) => (
								<div
									key={item._id}
									className='flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0'
								>
									<div className='flex items-center gap-4'>
										<img
											src={item.imageUrl}
											alt={item.name}
											className='h-14 w-14 rounded-lg object-cover'
										/>

										<div>
											<p className='font-semibold'>
												Added {item.name}
											</p>

											<p className='text-sm text-gray-500'>
												Weather: {item.weather}
											</p>
										</div>
									</div>

									{item.createdAt && (
										<span className='text-sm text-gray-500'>
											{new Date(
												item.createdAt,
											).toLocaleDateString()}
										</span>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		);
	}

	const itemsToDisplay =
		activeSection === 'favorites' ? favoriteItems : currentUserItems;

	return (
		<div className='cloth-section'>
			<div className='cloth-header'>
				<p className='cloth-item'>
					{activeSection === 'favorites' ? 'Favorites' : 'Your items'}
				</p>

				{activeSection === 'my-items' && (
					<button
						className='cloth-add-button'
						onClick={handleAddClick}
					>
						+ Add new
					</button>
				)}
			</div>

			<ul className='profile-cards__list'>
				{itemsToDisplay?.map((item) => (
					<ItemCard
						key={item._id}
						item={item}
						onCardClick={handleCardClick}
					/>
				))}
			</ul>
		</div>
	);
}

export default ClothesSection;
