export const base_url = "http://localhost:8000";

export const addRate = async (values) => {
  const response = await fetch("".concat(`${base_url}`, "/rate/addRate"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values, null, 2),
  });

  if (!response.ok) {
    return Promise.reject({
      msg: response.statusText,
      status: response.status,
    });
  }
};
