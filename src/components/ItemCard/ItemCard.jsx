import './ItemCard.css';
import likeIcon from '../../assets/rating/heart-fill.svg';
import dislikeIcon from '../../assets/rating/dislike.png';
import { likeItem, dislikeItem } from '../../utils/Api';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { StateContext } from '../../contexts/StateContext.js';
import { ItemContext } from '../../contexts/ItemsContext';

function ItemCard({ item, onCardClick }) {
	const { currentUser } = useContext(CurrentUserContext);
	const { isLoggedIn } = useContext(StateContext);

	const { handleLikeUpdate } = useContext(ItemContext);

	const [isLiked, setIsLiked] = useState(false);

	const handleCardClick = () => {
		onCardClick(item);
	};

	useEffect(() => {
		const userId = currentUser?._id;

		if (item.likes?.length > 0 && userId && item.likes.includes(userId)) {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
	}, [item.likes, currentUser?._id]);

	const handleLikeClick = async () => {
		try {
			let updatedItem;

			if (isLiked) {
				updatedItem = await dislikeItem(item._id);
			} else {
				updatedItem = await likeItem(item._id);
			}

			// Update the shared clothing list immediately.
			// Favorites can now react without a page refresh.
			handleLikeUpdate(updatedItem);
		} catch (error) {
			console.error('Error liking/disliking the item:', error);
		}
	};

	return (
		<li className='card'>
			<div className='card__text'>
				<h2 className='card__name'>{item.name}</h2>

				{isLoggedIn && (
					<img
						className='like__icon'
						src={isLiked ? likeIcon : dislikeIcon}
						alt={isLiked ? 'Liked' : 'Not liked'}
						onClick={handleLikeClick}
						style={{
							cursor: 'pointer',
						}}
					/>
				)}
			</div>

			<img
				onClick={handleCardClick}
				className='card__image'
				src={item.imageUrl}
				alt={item.name}
			/>
		</li>
	);
}

export default ItemCard;
