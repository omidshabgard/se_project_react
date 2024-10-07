import React, { useState } from 'react';
import ModalWithForm from './ModalWithForm/ModalWithForm';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onLoginSuccess({ email, password });
            onClose();
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <ModalWithForm
            title="Login"
            buttonText="Login"
            subButton="Register"
            isOpen={isOpen}
            onClick={onClose} 
            onSubmit={handleSubmit} 
        >
            {error && <p>{error}</p>}
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

export default LoginModal;
