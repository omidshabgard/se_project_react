import React, { useState } from "react";
import { updateUser } from "../utils/auth";
import ModalWithForm from "./ModalWithForm/ModalWithForm";

const UpdateUserModal = ({
  isOpen,
  onClose,
  onUpdateSuccess,
  initialName,
  initialAvatar,
}) => {
  const [name, setName] = useState(initialName || "");
  const [avatar, setAvatar] = useState(initialAvatar || "");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateUser(name, avatar);
      console.log("User updated successfully:", data);
      await onUpdateSuccess(data);
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      setError(err);
    } finally {
      console.log("err")
    }
  };

  return (
    <ModalWithForm
      title="Update Data"
      buttonText="Save Changes"
      isOpen={isOpen}
      onClick={onClose}
      onSubmit={handleSubmit}
    >
      {error && <p className="error-message">{error}</p>}
      <label className="modal__label" htmlFor="name">
        Name
      </label>
      <input
        type="text"
        className="modal__input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label className="modal__label" htmlFor="avatar">
        Avatar URL
      </label>
      <input
        type="text"
        className="modal__input"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />
    </ModalWithForm>
  );
};

export default UpdateUserModal;
