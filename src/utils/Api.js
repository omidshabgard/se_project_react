import { BASE_URL } from './constants';

function checkResponse(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Error ${res.status}: ${res.statusText}`);
}

function getItems() {
	const token = localStorage.getItem('token');
	if (!token) {
		return Promise.reject('No token available');
	}

	return fetch(`${BASE_URL}/items`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	})
		.then(checkResponse)
		.catch((error) => {
			console.error('Failed to fetch items:', error);
			return Promise.reject(error);
		});
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
	})
		.then(checkResponse)
		.catch((error) => {
			console.error('Failed to post item:', error);
			return Promise.reject(error);
		});
}

function deleteItem(id) {
	const token = localStorage.getItem('token');
	if (!token) {
		return Promise.reject('No token available');
	}

	if (!id) {
		return Promise.reject('No item ID provided');
	}

	return fetch(`${BASE_URL}/items/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	})
		.then(checkResponse)
		.catch((error) => {
			console.error('Failed to delete item:', error);
			return Promise.reject(error);
		});
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
			'Content-Type': 'application/json',
		},
	})
		.then(checkResponse)
		.catch((error) => {
			console.error('Failed to like item:', error);
			return Promise.reject(error);
		});
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
			'Content-Type': 'application/json',
		},
	})
		.then(checkResponse)
		.catch((error) => {
			console.error('Failed to dislike item:', error);
			return Promise.reject(error);
		});
}

export {
	deleteItem,
	postItems,
	getItems,
	checkResponse,
	likeItem,
	dislikeItem,
};
