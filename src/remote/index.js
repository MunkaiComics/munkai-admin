import { logout } from '../components/auth'

export const handleResponse = (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      logout()
    } else if (response.status === 403) {
      let baseURL = window.location.toString().split('#')
      window.location = baseURL[0] + '#/403'
    } else {
      let baseURL = window.location.toString().split('#')
      window.location = baseURL[0] + '#/500'
    }
  } else {
    return response.json()
  }
}
