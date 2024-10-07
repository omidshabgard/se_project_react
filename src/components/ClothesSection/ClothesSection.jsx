import React, { useContext } from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import { ItemContext } from '../../contexts/ItemsContext';

function ClothesSection({ handleAddClick, currentUser }) {
	const { clothItems } = useContext(CurrentTemperatureUnitContext);
	const { handleCardClick } = useContext(ItemContext);

	const currentUserItems = clothItems?.filter(item => currentUser && item.owner === currentUser._id);

	return (
		<div className='cloth-section'>
			<div className='cloth-header'>
				<p className='cloth-item'>Your items</p>
				<button className='cloth-add-button' onClick={handleAddClick}>
					+ Add new
				</button>
			</div>
			<div>
				<ul className='cards__list'>
					{currentUserItems?.map((item) => {
						console.log(item)
						return (
							<ItemCard
								key={item._id}
								currentUser={currentUser}
								item={item}
								onCardClick={handleCardClick}
							/>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default ClothesSection;
