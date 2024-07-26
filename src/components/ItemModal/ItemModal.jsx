import './ItemModal.css';
function ItemModal({ activeModal, onClose, card }) {
	return (
		<div className='modal'>
			<div className='{`modal ${activeModal === "preview" && modal_opened}`}' />
			<div className='modal__content modal__content_type_image'>
				<button
					onClick={onClose}
					type='button'
					className='modal__close'
				>
					CLOSE
				</button>
				<img src={card.link} alt='' className='modal__image' />
			</div>
		</div>
	);
}

export default ItemModal;
