import './ItemModal.css';
function ItemModal({ activeModal, onClose, card }) {
	return (
		<div
			className={`modal ${activeModal === 'preview' && 'modal_opened'} `}
		>
			<div className='modal__content modal__content_type_image preview_modal'>
				<div className='display_image_modal'>
					<button
						onClick={onClose}
						type='button'
						className='modal__close itemModal_close preview_modal_close'
					>
						X
					</button>
					<img src={card.link} alt='card' className='modal__image' />
				</div>
				<div className='modal__footer'>
					<h2 className='modal__caption'>{card.name}</h2>
					<p className='modal__weather'>Weather: {card.weather}</p>
				</div>
			</div>
		</div>
	);
}

export default ItemModal;
