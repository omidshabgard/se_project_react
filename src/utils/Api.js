import { BASE_URL } from './constants';

function checkResponse(res) {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(`Error ${res.status}`);
	}
}

function getItems() {
	const token = localStorage.getItem('token');
	if (!token) {
		return Promise.reject('No token available');
	}

	return fetch(`${BASE_URL}/items`, {
		headers: {
			Authorization: `Bearer ${token}`, // Add token to headers
		},
	}).then((res) => checkResponse(res));
}

function postItems(generatedData) {
	const token = localStorage.getItem('token');
	if (!token) {
		return Promise.reject('No token available');
	}

	return fetch(`${BASE_URL}/items`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(generatedData),
	}).then((res) => checkResponse(res));
}

function deleteItem(id) {
	const token = localStorage.getItem('token');
	if (!token) {
		return Promise.reject('No token available');
	}

	if (id) {
		return fetch(`${BASE_URL}/items/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => checkResponse(res));
	}
}

function likeItem(itemId) {
	const token = localStorage.getItem('token');
	if (!token) {
		return Promise.reject('No token available');
	}

	return fetch(`${BASE_URL}/items/${itemId}/likes`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => checkResponse(res));
}

function dislikeItem(itemId) {
	const token = localStorage.getItem('token');
	if (!token) {
		return Promise.reject('No token available');
	}

	return fetch(`${BASE_URL}/items/${itemId}/likes`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => checkResponse(res));
}

export {
	deleteItem,
	postItems,
	getItems,
	checkResponse,
	likeItem,
	dislikeItem,
};
