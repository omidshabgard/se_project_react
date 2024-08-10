import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function AddItemModal({ activeModal, closeActiveModal, isOpen, onAddItem }) {
  const [formData, setFormData] = useState({ weather: "hot" });

  const handleValueChange = (e) => {
    console.log(e);
    if (e.target.name === "weather" && e.target.checked) {
      setFormData({ ...formData, [e.target.name]: e.target.id });
    }
    else
    {setFormData({ ...formData, [e.target.id]: e.target.value });}
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(formData);
  };

  return (
    <>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClick={closeActiveModal}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
            value={formData?.name}
            onChange={handleValueChange}
          />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          Image
          <input
            type="text"
            className="modal__input"
            id="imageURL"
            placeholder="Image URL"
            onChange={handleValueChange}
            value={formData?.imageURL}
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              name="weather"
              className="modal__radio-input"
              onChange={handleValueChange}
              checked={formData?.weather === "hot"}
            />
            Hot
          </label>

          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              name="weather"
              className="modal__radio-input"
              onChange={handleValueChange}
              checked={formData?.weather === "warm"}
            />
            Warm
          </label>

          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              name="weather"
              className="modal__radio-input"
              onChange={handleValueChange}
              checked={formData?.weather === "cold"}
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
    </>
  );
}

export default AddItemModal;