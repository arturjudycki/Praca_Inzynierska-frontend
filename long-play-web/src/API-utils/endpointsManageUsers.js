export const base_url = "http://localhost:8000";

export const createEditorAdmin = async (values) => {
  const response = await fetch(
    "".concat(`${base_url}`, "/user/createEditorAdmin"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values, null, 2),
    }
  );

  if (!response.ok) {
    return Promise.reject({
      msg: response.statusText,
      status: response.status,
    });
  }
};
