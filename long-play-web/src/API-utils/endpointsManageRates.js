export const base_url = "http://localhost:8000";

export const addRateAlbum = async (values) => {
  const response = await fetch("".concat(`${base_url}`, "/rate/addRateAlbum"), {
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

export const addRateSong = async (values) => {
  const response = await fetch("".concat(`${base_url}`, "/rate/addRateSong"), {
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

export const getRateAlbumByUser = async (music_album) => {
  const response = await fetch(
    "".concat(
      `${base_url}`,
      "/rate/".concat(`${music_album}`, "/getRateAlbumByUser")
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