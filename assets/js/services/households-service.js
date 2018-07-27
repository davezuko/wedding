import axios from 'axios'

export function list() {
  return axios.get('/api/households?rsvp=true').then(res => res.data)
}

export function submitRSVP(household) {
  return axios.post('/api/rsvp', household)
}
