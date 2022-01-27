const baseUrl = 'https://60d49bf961160900173cbb6b.mockapi.io/api/v1/calendar';

export const updateEvents = () =>
  fetch(baseUrl).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Internal Server Error. Can't display events");
  });

export const deleteEvent = (id) =>
  fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

export const postNewEvent = (toPost) =>
  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(toPost),
  });
