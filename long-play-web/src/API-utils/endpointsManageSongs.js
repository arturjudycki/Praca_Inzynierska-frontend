export const base_url = "http://localhost:8000";

export const addSong = async (values) => {
  const response = await fetch("".concat(`${base_url}`, "/song/addSong"), {
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

export const getSongsOfAlbum = async (id_music_album) => {
  const response = await fetch(
    "".concat(
      `${base_url}`,
      "/song/".concat(`${id_music_album}`, "/getSongsOfAlbum")
    ),
    {
      method: "GET",
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

