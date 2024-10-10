import React, { useState } from 'react';
import ModalWithForm from './ModalWithForm/ModalWithForm';

const RegisterModal = ({ isOpen, onClose, onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onRegisterSuccess({ name, avatar, email, password });
      onClose();
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <ModalWithForm
      title='Register'
      buttonText='Next'
      subButton='Login'
      isOpen={isOpen}
      onClick={onClose}
      onSubmit={handleSubmit}
    >
      {error && <p className='error-message'>{error}</p>}
      <label className='modal__label' htmlFor='name-input'>
        Name
      </label>
      <input
        id='name-input'
        type='text'
        className='modal__input'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label className='modal__label' htmlFor='avatar-input'>
        Avatar URL
      </label>
      <input
        id='avatar-input'
        type='text'
        className='modal__input'
        placeholder='Avatar URL'
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />
      <label className='modal__label' htmlFor='email-input'>
        Email
      </label>
      <input
        id='email-input'
        className='modal__input'
        type='email'
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label className='modal__label' htmlFor='password-input'>
        Password
      </label>
      <input
        id='password-input'
        className='modal__input'
        type='password'
        placeholder='Enter your password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </ModalWithForm>
  );
};

export default RegisterModal;