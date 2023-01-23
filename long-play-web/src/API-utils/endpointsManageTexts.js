export const base_url = "http://localhost:8000";

export const createText = async (values) => {
  const response = await fetch("".concat(`${base_url}`, "/text/createText"), {
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

export const updateText = async (values) => {
  const response = await fetch("".concat(`${base_url}`, "/text/updateText"), {
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

export const getTextsByIdUser = async (values) => {
  const response = await fetch(
    "".concat(`${base_url}`, "/text/getTextsByIdUser"),
    {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (response.ok) {
    // console.log(response.json());
    return response.json();
  }
  return Promise.reject({
    msg: response.statusText,
    status: response.status,
  });
};

export const getTextByIdText = async (id_text) => {
  const response = await fetch(
    "".concat(`${base_url}`, "/text/".concat(`${id_text}`)),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    // console.log(response.json());
    return response.json();
  }
  return Promise.reject({
    msg: response.statusText,
    status: response.status,
  });
};