import { API } from '../constants/env'
import { isAuthenticated } from '../components/auth'
import { handleResponse } from './index'

export const signin = (user) => {
  return fetch(`${API}/admin-user/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        return { message: 'Invalid credentials', error: 'Bad Request' }
      }
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getAuthUser = () => {
  return fetch(`${API}/admin-user/getAuth`, {
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

//TODO
export const confirmToken = (token) => {
  return fetch(`${API}/admin-user/confirm_token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(token),
  })
    .then((response) => {
      if (!response.ok) {
        return { message: 'Invalid credentials', error: 'Bad Request' }
      }
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
}

//TODO
export const resetPassword = (data) => {
  return fetch(`${API}/admin-user/reset_password`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => console.log('error', error))
}
