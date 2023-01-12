export const base_url = "http://localhost:8000";

export const userAuth = async () => {
  return await fetch("".concat(`${base_url}`, "/user/loggedUser"), {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};
