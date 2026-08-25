import { checkResponse } from '../utils/Api';
import { BASE_URL } from './constants';

export const checkToken = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}).then(checkResponse);
};

export const signup = (name, avatar, email, password) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name,
			avatar,
			email,
			password,
		}),
	}).then(checkResponse);
};

export const signin = (email, password) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	}).then(checkResponse);
};

export const updateUser = async (name, avatar) => {
	const token = localStorage.getItem('token');

	if (!token) {
		return Promise.reject('No token available');
	}

	return fetch(`${BASE_URL}/users/me`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			name,
			avatar,
		}),
	}).then(checkResponse);
};
