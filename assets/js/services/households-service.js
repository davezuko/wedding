import axios from 'axios'

export function list() {
  return axios.get('/api/households?rsvp=true').then(res => res.data)
}

export function submitRSVP(household) {
  alert('Submissions do not work yet!')
  return Promise.resolve()
  return axios.post('/api/households/rsvp', household).then(res => res.data)
}
