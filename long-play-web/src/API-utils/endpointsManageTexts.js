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
    method: "PATCH",
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

export const getTextsByIdUser = async () => {
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
    return response.json();
  }
  return Promise.reject({
    msg: response.statusText,
    status: response.status,
  });
};

export const getAllTexts = async () => {
  const response = await fetch("".concat(`${base_url}`, "/text/allTexts"), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return response.json();
  }
  return Promise.reject({
    msg: response.statusText,
    status: response.status,
  });
};

export const getTextsByArticle = async () => {
  const response = await fetch("".concat(`${base_url}`, "/text/article"), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return response.json();
  }
  return Promise.reject({
    msg: response.statusText,
    status: response.status,
  });
};

export const getTextsByNews = async () => {
  const response = await fetch("".concat(`${base_url}`, "/text/news"), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return response.json();
  }
  return Promise.reject({
    msg: response.statusText,
    status: response.status,
  });
};

export const getTextsByRanking = async () => {
  const response = await fetch("".concat(`${base_url}`, "/text/ranking"), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return response.json();
  }
  return Promise.reject({
    msg: response.statusText,
    status: response.status,
  });
};

export const getTextsByInterview = async () => {
  const response = await fetch("".concat(`${base_url}`, "/text/interview"), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return response.json();
  }
  return Promise.reject({
    msg: response.statusText,
    status: response.status,
  });
};