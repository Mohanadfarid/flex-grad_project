export const baseUrl = "https://felx-backend.onrender.com/";

export const postData = async (endPoint, data = {}) => {
  const response = await fetch(`${baseUrl}${endPoint}`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const newData = await response.json();
  return newData;
};

export const getData = async (endPoint) => {
  const response = await fetch(`${baseUrl}${endPoint}`);
  const json = await response.json();
  return await json;
};

export const putData = async (endPoint, data) => {
  const response = await fetch(`${baseUrl}${endPoint}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
};
