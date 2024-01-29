import { API } from '../../constants/env'

export const authenticate = (token) => {
  if (typeof window != 'undefined') {
    localStorage.setItem('munkai_admin_token', token)
  }
}

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false
  }
  if (localStorage.getItem('munkai_admin_token')) {
    return localStorage.getItem('munkai_admin_token')
  } else {
    return false
  }
}

export const signout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('munkai_admin_token')
    window.location.reload()
    return fetch(`${API}/signout`, {
      method: 'GET',
    })
      .then((response) => {
        console.log('signout', response)
      })
      .catch((err) => console.log(err))
  }
}

export const logout = () => {
  if (typeof window != 'undefined') {
    localStorage.removeItem('munkai_admin_token')
    window.location.reload()
  }
}
