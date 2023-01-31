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
