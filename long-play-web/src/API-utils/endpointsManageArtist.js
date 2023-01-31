export const base_url = "http://localhost:8000";

export const addArtist = async (values) => {
  const response = await fetch("".concat(`${base_url}`, "/artist/addArtist"), {
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
