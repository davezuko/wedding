import axios from 'axios'

export function list() {
  return axios.get('/api/households?rsvp=true').then(res => res.data)
}
