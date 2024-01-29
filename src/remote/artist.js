import { API } from '../constants/env'
import { isAuthenticated } from '../components/auth'
import { handleResponse } from './index'

export const getArtistRequests = () => {
  return fetch(`${API}/user/creator-requests`, {
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

export const approveArtistRequest = (address) => {
  return fetch(`${API}/artist/approve/${address}`, {
    method: 'POST',
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


export const getArtistCount = () => {
  return fetch(`${API}/artist/count`, {
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
