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
  } else {
    return response.json();
  }
};

export const getArtistById = async (id_artist) => {
  const response = await fetch(
    "".concat(
      `${base_url}`,
      "/artist/".concat(`${id_artist}`, "/getArtistById")
    ),
    {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    return Promise.reject({
      msg: response.statusText,
      status: response.status,
    });
  } else {
    return response.json();
  }
};

export const getAllArtists = async () => {
  const response = await fetch(
    "".concat(`${base_url}`, "/artist/getAllArtists"),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return Promise.reject({
      msg: response.statusText,
      status: response.status,
    });
  } else {
    return response.json();
  }
};

export const editArtist = async (values) => {
  const response = await fetch("".concat(`${base_url}`, "/artist/editArtist"), {
    method: "PUT",
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