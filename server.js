const next = require('next')
const express = require('express')
const axios = require('axios')
const cookieParser = require('cookie-parser')

const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ isDev })
const handle = app.getRequestHandler()

const AUTH_USER_TYPE = 'authenticated'
const COOKIE_KEY = 'fgbhngf'
const COOKIE_OPT = {
  httpOnly: true,
  secure: !isDev,
  signed: true
}

const auth = async (email, password) => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
  return data.find(user => {
    if (user.email === email && user.website === password) {
      return user
    } 
  })
}

app.prepare()
  .then(() => {
    const server = express()
    server.use(express.json())
    server.use(cookieParser(COOKIE_KEY))

    server.post('/api/login', async (req, res) => {
      const {email, password} = req.body
      const user = await auth(email, password)
      if (!user) return res.status(403).send('invalid email or pasword')

      const userData = {
        name: user.name,
        email: user.email,
        type: AUTH_USER_TYPE
      }
      res.cookie('token', userData, COOKIE_OPT)
      res.json(userData)
    })

    server.get('/api/profile', async (req, res) => {
      const { signedCookies  = {} } = req
      const { token } =  signedCookies
      if (token && token.email) {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
        const user = data.find(user => user.email === token.email)
        return res.json({ user })
      }
      res.status(404).send()
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`Listening on PORT ${port}`)
    })
  })