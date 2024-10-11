import './ModalWithForm.css';
import closeIcon from '../../assets/closeIcon.png';

function ModalWithForm({
  children,
  buttonText,
  subButton,
  title,
  isOpen,
  onClick,
  onSubmit,
  handleSubButton
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}  modal_mobileView`}>
      <div className={`modal__content${isOpen && "Active"}`}>
        <h2 className="modal__title">{title}</h2>

        <button onClick={onClick} type="button" className="modal__close">
          <img src={closeIcon} alt="close" />
        </button>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div>
            <button type="submit" className="modal__submit">
              {buttonText} 
            </button>
            <span className='sub__button'>
              {subButton ? (
                <>
                  <span>or</span><span className="btn" onClick={() => handleSubButton(subButton)}>{subButton}</span>
                </>
              ) : null}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
