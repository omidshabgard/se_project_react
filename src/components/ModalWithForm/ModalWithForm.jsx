import "./ModalWithForm.css";
import closeIcon from "../../assets/closeIcon.png";

function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
  return (
    <div
      className={`modal ${
        activeModal === "add-garment" && "modal_opened"
      }  modal_mobileView`}
    >
      <div className="modal__content  ">
        <h2 className="modal__title">{title}</h2>

        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="close" />
        </button>

        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit" disabled>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
