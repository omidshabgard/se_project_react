import React, { useState } from 'react';
import { signup } from '../utils/auth';
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
			const data = await signup(name, avatar, email, password);
			localStorage.setItem('token', data.token);
			onRegisterSuccess(); // Call the success handler
			onClose(); // Close the modal
		} catch (err) {
			setError('Registration failed. Please try again.');
		}
	};

	return (
		<ModalWithForm
			title="Register"
			buttonText="Next"
			subButton="Login"
			isOpen={isOpen}
			onClick={onClose}
			onSubmit={handleSubmit}
		>
			{error && <p className="error-message">{error}</p>}
			<label className='modal__label' htmlFor='name'>Name</label>
			<input
				type='text'
				className='modal__input'
				placeholder='Name'
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<label className='modal__label' htmlFor='avatar'>Avatar URL</label>
			<input
				type='text'
				className='modal__input'
				placeholder='Avatar URL'
				value={avatar}
				onChange={(e) => setAvatar(e.target.value)}
				required
			/>
			<label className='modal__label' htmlFor='email'>Email</label>
			<input
				id='email'
				className='modal__input'
				type='email'
				placeholder='Enter your email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<label className='modal__label' htmlFor='password'>Password</label>
			<input
				id='password'
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
