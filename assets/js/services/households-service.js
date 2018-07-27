import axios from 'axios'

export function list() {
  return axios.get('/api/households').then(res => res.data)
}

export function submitRSVP(household, comments) {
  return axios.post('/api/rsvp', {household, comments})
}
