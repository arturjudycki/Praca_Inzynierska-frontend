export const base_url = "http://localhost:8000";

export const addAlbum = async (values) => {
  const {
    title,
    cover,
    release_date,
    duration,
    type_of_album,
    genre,
    record_label,
  } = values;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("cover", cover);
  formData.append("release_date", release_date);
  formData.append("duration", duration);
  formData.append("type_of_album", type_of_album);
  formData.append("genre", genre);
  formData.append("record_label", record_label);

  const response = await fetch("".concat(`${base_url}`, "/album/addAlbum"), {
    method: "POST",
    headers: {},
    credentials: "include",
    body: formData,
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

export const editInfoAlbum = async (values) => {
  const response = await fetch(
    "".concat(`${base_url}`, "/album/editInfoAlbum"),
    {
      method: "PUT",
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

export const editCoverOfAlbum = async (values) => {
  const { id_music_album, cover } = values;
  const formData = new FormData();
  formData.append("id_music_album", id_music_album);
  formData.append("cover", cover);

  const response = await fetch(
    "".concat(`${base_url}`, "/album/editCoverAlbum"),
    {
      method: "PATCH",
      headers: {},
      credentials: "include",
      body: formData,
    }
  );

  if (!response.ok) {
    return Promise.reject({
      msg: response.statusText,
      status: response.status,
    });
  }
};

export const getAlbumById = async (id_music_album) => {
  const response = await fetch(
    "".concat(
      `${base_url}`,
      "/album/".concat(`${id_music_album}`, "/getAlbumById")
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

export const getAllAlbums = async () => {
  const response = await fetch(
    "".concat(`${base_url}`, "/album/getAllAlbums"),
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

export const getLastAlbums = async () => {
  const response = await fetch(
    "".concat(`${base_url}`, "/album/getLastAlbums"),
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

export const assignArtistToAlbum = async (values) => {
  const response = await fetch(
    "".concat(`${base_url}`, "/album/assignArtistToAlbum"),
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

export const deleteAssignArtist = async (values) => {
  const response = await fetch(
    "".concat(`${base_url}`, "/album/deleteAssignArtist"),
    {
      method: "DELETE",
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

export const getArtistsByAlbumId = async (id_music_album) => {
  const response = await fetch(
    "".concat(
      `${base_url}`,
      "/album/".concat(`${id_music_album}`, "/getArtistsByAlbumId")
    ),
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