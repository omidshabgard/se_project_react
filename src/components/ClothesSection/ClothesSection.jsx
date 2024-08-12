import React, { useContext } from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import { ItemContext } from '../../contexts/ItemsContext';

function ClothesSection({ handleAddClick }) {
	const { clothItems } = useContext(CurrentTemperatureUnitContext);
	const { handleCardClick } = useContext(ItemContext);
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
					{clothItems?.map((item) => {
						return (
							<ItemCard
								key={item._id}
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
