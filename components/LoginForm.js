import { useState } from 'react'
import { loginUser } from '../lib/auth'
import Router from 'next/router'


const LoginForm = () => {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const onChangeHandler = event => {
    event.target.name === 'email' ? setEmail(event.target.value) : setPassword(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    loginUser(email, password)
      .then(() => {
        Router.push('/profile')
      })
  } 

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          type='email' 
          name='email'
          placeholder='email'
          value={email}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <input 
          type='password'
          name='password'
          placeholder='password'
          value={password}
          onChange={onChangeHandler}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default LoginForm