import closeIcon from '../../assets/closeIcon.png';
import './ItemModal.css';
import { useContext } from 'react';
import { StateContext } from '../../contexts/StateContext.js';

function ItemModal({
  activeModal,
  onClose,
  card,
  deleteCard,
  handleDeleteCard,
  onDelete,
}) {

  const { isLoggedIn } = useContext(StateContext);

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"} `}>
      <div className="modal__content modal__content_type_image preview_modal">
        <div className="display_image_modal">
          <button
            onClick={onClose}
            type="button"
            className={`modal__close${deleteCard ? "Active" : ""}
						 itemModal_close preview_modal_close`}
          >
            <img src={closeIcon} alt="closeIcon" />
          </button>
          {!deleteCard && (
            <img src={card.imageUrl} alt="card" className="modal__image" />
          )}
        </div>
        {!deleteCard && (
          <div className="modal_info">
            <div className="modal__footer">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            {isLoggedIn && (<button className="modal_delete" onClick={handleDeleteCard}>
              Delete item
            </button>)}
          </div>
        )}
        {deleteCard && (
          <div className="modal_delete_content">
            <div className="modal_delete_info">
              <p> Are you sure you want to delete this item?</p>
              <p>This action is irreversible.</p>
            </div>
            <button
              className="modal_deleteItem"
              onClick={() => onDelete(card._id)}
            >
              Yes, delete item
            </button>
            <button className="modal_cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
