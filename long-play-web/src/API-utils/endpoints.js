export const base_url = "http://localhost:8000";

export const userAuth = async () => {
  const response = await fetch("".concat(`${base_url}`, "/user/loggedUser"), {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (response.ok) {
    return response.json();
  }
  return Promise.reject({
    msg: response.statusText,
    status: response.status,
  });
};

export const loginAuth = async (values) => {
  const response = await fetch("".concat(`${base_url}`, "/auth/login"), {
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

export const logoutAuth = async (values) => {
  await fetch("".concat(`${base_url}`, "/auth/logout"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const registerAuth = async (values) => {
  const response = await fetch("".concat(`${base_url}`, "/auth/register"), {
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

export const sendLinkToEmail = async (values) => {
  const response = await fetch(
    "".concat(`${base_url}`, "/auth/sendEmailLink"),
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

export const resetPassword = async (values) => {
  const response = await fetch(
    "".concat(`${base_url}`, "/auth/resetPassword"),
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