import { useState ,useEffect } from 'react'
import { getUserProfile } from '../lib/auth'

const Profile = () => {

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getUserProfile()
      .then(user => setProfile(user))
  }, [])

  return (
    <>
      { JSON.stringify(profile) }
    </>
  )
}

export default Profile