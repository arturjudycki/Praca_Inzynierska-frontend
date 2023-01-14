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
  throw new Error();
};

export const loginAuth = async (values) => {
  await fetch("".concat(`${base_url}`, "/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values, null, 2),
  });
};

export const logoutAuth = async (values) => {
  await fetch("".concat(`${base_url}`, "/auth/logout"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    // body: JSON.stringify(values, null, 2),
  });
};