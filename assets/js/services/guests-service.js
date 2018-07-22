import axios from 'axios'

export function list() {
  return axios.get('/api/guests').then(res => res.data)
}

export function update(guestId, record) {
  return axios.put(`/api/guests/${guestId}`, record).then(res => res.data)
}
