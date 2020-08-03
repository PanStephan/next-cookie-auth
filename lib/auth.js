import axios from 'axios'

axios.default.withCredentials = true

export const loginUser = async (email, password)  => {
  const { data } =  await axios.post('/api/login', { email, password })
}

export const getUserProfile = async () => {
  const { data } = await axios.get('api/profile')
  return data
}