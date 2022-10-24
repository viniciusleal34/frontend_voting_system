export const isAuthenticated = () => localStorage.getItem("jwt") !== null;
export const getToken = () => localStorage.getItem("jwt");
export const getNivel = () => localStorage.getItem("nivel");
export const getId = () => localStorage.getItem("id");
export const getUser = () => localStorage.getItem("user");

export const login = (token, user) => {
  localStorage.setItem("jwt", token);
  localStorage.setItem("user", user);
};
export const logout = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
};
