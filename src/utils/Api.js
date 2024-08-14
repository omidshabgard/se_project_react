const baseUrl = 'http://localhost:3001';

function checkResponse(res) {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(`Error ${res.status}`);
	}
}

function getItems() {
	return fetch(`${baseUrl}/items`).then(checkResponse);
}

function postItems(generatedData) {
	return fetch(`${baseUrl}/items`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(generatedData),
	}).then(checkResponse);
}

function deleteItem(id) {
	if (id) {
		return fetch(`${baseUrl}/items/${id}`, {
			method: 'DELETE',
		}).then(checkResponse);
	}
}
export { deleteItem, postItems, getItems, checkResponse };
