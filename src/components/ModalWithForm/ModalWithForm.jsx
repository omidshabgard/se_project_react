import './ModalWithForm.css';
import closeIcon from '../../assets/closeIcon.png';

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClick,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}  modal_mobileView`}>
      <div className="modal__content  ">
        <h2 className="modal__title">{title}</h2>

        <button onClick={onClick} type="button" className="modal__close">
          <img src={closeIcon} alt="close" />
        </button>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
