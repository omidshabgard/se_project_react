import { checkResponse } from '../utils/Api';

// import { BASE_URL } from './constants';

const BASE_URL = 'http://localhost:3001';

export const checkToken = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => checkResponse(res));
};


export const signup = (name, avatar, email, password) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, avatar, email, password }),
	}).then((res) => checkResponse(res));
};

export const signin = (email, password) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then((res) => checkResponse(res));
};

export const updateUser = async (name, avatar) => {
	const token = localStorage.getItem('token');

	return fetch(`${BASE_URL}/updateUser`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ name, avatar }),
	}).then((res) => checkResponse(res));
};
