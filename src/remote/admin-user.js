import { API } from '../constants/env'
import { isAuthenticated } from '../components/auth'
import { handleResponse } from './index'

export const getAdminUsers = () => {
  return fetch(`${API}/admin-user`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${isAuthenticated()}`,
    },
  })
    .then(handleResponse)
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getAdminUser = (id) => {
  return fetch(`${API}/admin-user/getUser?id=${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${isAuthenticated()}`,
    },
  })
    .then(handleResponse)
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.log(err)
    })
}

export const updateUser = (data) => {
  return fetch(`${API}/admin-user/update_user`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${isAuthenticated()}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => console.log('error', error))
}

export const getPermissions = () => {
  return fetch(`${API}/admin-user/permissions`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${isAuthenticated()}`,
    },
  })
    .then(handleResponse)
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.log(err)
    })
}

export const removeAdminUser = (data) => {
  return fetch(`${API}/admin-user/remove_admin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${isAuthenticated()}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => console.log('error', error))
}

export const createAdminUser = (data) => {
  return fetch(`${API}/admin-user/createAdminUser`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${isAuthenticated()}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => console.log('error', error))
}
