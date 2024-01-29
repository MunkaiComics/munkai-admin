import { API } from "../constants/env";
import { isAuthenticated } from "../components/auth";
import { handleResponse } from "./index";

export const addComic = (data) => {
  return fetch(`${API}/comic/addComic`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${isAuthenticated()}`,
    },
    body: data,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log("error", error));
};

export const getComics = () => {
  return fetch(`${API}/comic`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated()}`,
    },
  })
    .then(handleResponse)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getComic = (id) => {
  return fetch(`${API}/comic/get?id=${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated()}`,
    },
  })
    .then(handleResponse)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getComicsCount = () => {
  return fetch(`${API}/comic/count`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated()}`,
    },
  })
    .then(handleResponse)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getChaptersCount = () => {
  return fetch(`${API}/comic/chapter/count`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated()}`,
    },
  })
    .then(handleResponse)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};
