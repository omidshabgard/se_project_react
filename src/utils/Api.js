const baseUrl = "http://localhost:3001";
function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
  });
}
export { getItems };

function postItems(generatedData) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(generatedData),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
  });
}
export { postItems };

function deleteItem(id) {
  if (id) {
    return fetch(`${baseUrl}/items/${id}`, {
      method: "DELETE",
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
    });
  }
}
export { deleteItem };
