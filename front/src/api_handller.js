export const postData = async (url = "", data = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData;
  } catch (error) {
    return error;
  }
};

export const getData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return await json;
  } catch (error) {
    return error;
  }
};

export const putData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  } catch (error) {
    return error;
  }
};
