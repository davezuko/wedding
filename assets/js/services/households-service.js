import axios from 'axios'

export function list() {
  return axios.get('/api/households').then(res => res.data)
}
