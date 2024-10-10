const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error ${res.status}`);
  }
}

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => checkResponse(res));
}

function postItems(generatedData) {
  const token = localStorage.getItem("token");

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(generatedData),
  }).then((res) => checkResponse(res));
}

function deleteItem(id) {
  if (id) {
    const token = localStorage.getItem("token");

    return fetch(`${baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => checkResponse(res));
  }
}

function likeItem(itemId) {
  const token = localStorage.getItem("token");

  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT", 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
}

function dislikeItem(itemId) {
  const token = localStorage.getItem("token");

  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE", 
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
