import { API } from '../constants/env'
import { isAuthenticated } from '../components/auth'
import { handleResponse } from './index'

export const getUsers = () => {
  return fetch(`${API}/user`, {
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


export const getUsersCount = () => {
  return fetch(`${API}/user/count`, {
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
