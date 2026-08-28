import closeIcon from '../../assets/closeIcon.png';
import './ItemModal.css';
import { useContext, useState, useEffect } from 'react';
import { StateContext } from '../../contexts/StateContext.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ItemModal({
	activeModal,
	onClose,
	card,
	deleteCard,
	handleDeleteCard,
	onDelete,
}) {
	const { isLoggedIn } = useContext(StateContext);
	const { currentUser } = useContext(CurrentUserContext);

	const [aiResponse, setAiResponse] = useState('');
	const [aiMode, setAiMode] = useState('');

	// Reset AI response whenever a different clothing item is opened
	useEffect(() => {
		setAiResponse('');
		setAiMode('');
	}, [card?._id]);

	// Check whether the logged-in user owns this item
	const isOwner =
		currentUser &&
		card?.owner &&
		currentUser?._id &&
		card.owner.toString() === currentUser._id.toString();

	const getWeatherMessage = () => {
		if (card?.weather === 'hot') {
			return 'This item is a good choice for hot weather and lighter outfits.';
		}

		if (card?.weather === 'warm') {
			return 'This item works well for mild or warm weather and layered casual outfits.';
		}

		if (card?.weather === 'cold') {
			return 'This item is best suited for colder weather and warmer layered outfits.';
		}

		return 'AI can help you decide when and how to wear this item.';
	};

	const handleBuildOutfit = () => {
		setAiMode('outfit');

		setAiResponse(
			`I can build a complete outfit around "${card?.name}". Next, I’ll look at the other WTWR items and today's weather to recommend matching pieces.`,
		);
	};

	const handleFindMatches = () => {
		setAiMode('matches');

		setAiResponse(
			`I can search your WTWR clothing collection for items that match "${card?.name}" by style, weather, and clothing type.`,
		);
	};

	return (
		<div
			className={`modal ${
				activeModal === 'preview' ? 'modal_opened' : ''
			}`}
		>
			<div className='modal__content modal__content_type_image preview_modal'>
				<div className='display_image_modal'>
					<button
						onClick={onClose}
						type='button'
						className={`modal__close${
							deleteCard ? 'Active' : ''
						} itemModal_close preview_modal_close`}
					>
						<img src={closeIcon} alt='closeIcon' />
					</button>

					{!deleteCard && (
						<img
							src={card?.imageUrl}
							alt={card?.name || 'clothing item'}
							className='modal__image'
						/>
					)}
				</div>

				{!deleteCard && (
					<>
						<div className='modal_info'>
							<div className='modal__footer'>
								<h2 className='modal__caption'>{card?.name}</h2>

								<p className='modal__weather'>
									Weather: {card?.weather}
								</p>
							</div>

							{isLoggedIn && isOwner && (
								<button
									type='button'
									className='modal_delete'
									onClick={handleDeleteCard}
								>
									Delete item
								</button>
							)}
						</div>

						{/* AI SECTION */}
						<div className='mx-4 mb-4 mt-3 rounded-2xl border border-emerald-200 bg-gradient-to-br from-slate-950 via-emerald-950 to-cyan-900 p-4 text-white shadow-lg'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									<span className='text-xl'>🤖</span>

									<h3 className='text-base font-bold'>
										AI Insight
									</h3>
								</div>

								<span className='rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide'>
									AI
								</span>
							</div>

							<p className='mt-3 text-sm leading-5 text-white/85'>
								{getWeatherMessage()}
							</p>

							<div className='mt-4 flex flex-wrap gap-2'>
								<button
									type='button'
									onClick={handleBuildOutfit}
									className={`rounded-xl px-3 py-2 text-xs font-bold shadow-md transition-all duration-200 hover:scale-105 ${
										aiMode === 'outfit'
											? 'bg-orange-300 text-black'
											: 'bg-white/15 text-white hover:bg-white/25'
									}`}
								>
									✨ Build outfit with this
								</button>

								<button
									type='button'
									onClick={handleFindMatches}
									className={`rounded-xl px-3 py-2 text-xs font-bold shadow-md transition-all duration-200 hover:scale-105 ${
										aiMode === 'matches'
											? 'bg-orange-300 text-black'
											: 'bg-white/15 text-white hover:bg-white/25'
									}`}
								>
									🔎 What matches this?
								</button>
							</div>

							{aiResponse && (
								<div className='mt-4 rounded-xl bg-white/10 p-3'>
									<div className='mb-1 flex items-center gap-2'>
										<span>✨</span>

										<p className='text-xs font-bold text-emerald-200'>
											AI Stylist
										</p>
									</div>

									<p className='text-sm leading-5 text-white/90'>
										{aiResponse}
									</p>
								</div>
							)}
						</div>
					</>
				)}

				{deleteCard && (
					<div className='modal_delete_content'>
						<div className='modal_delete_info'>
							<p>Are you sure you want to delete this item?</p>

							<p>This action is irreversible.</p>
						</div>

						<button
							type='button'
							className='modal_deleteItem'
							onClick={() => onDelete(card?._id)}
						>
							Yes, delete item
						</button>

						<button
							type='button'
							className='modal_cancel'
							onClick={onClose}
						>
							Cancel
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default ItemModal;
