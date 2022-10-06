import type { NextPage } from 'next'
import { signIn, signOut, useSession, getCsrfToken } from 'next-auth/react'
import style from './index.module.scss'

const Home: NextPage = () => {
  const { data: session } = useSession()
  return (
    <div>
      {session && (
        <div>
          <p
          className={style.clickable}
            onClick={() => {
              signOut()
            }}
          >
            sign in complete
          </p>
          <p>{session.user.id}</p>
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
          <p>{session.user.nation}</p>
          <p>{session.user.myInputAccountInfo.id}</p>
          <p>{session.user.myInputAccountInfo.password}</p>
        </div>
      )}
      {!session && (
        <p
        className={style.clickable}
          onClick={() => {
            signIn()
          }}
        >
          need sign in
        </p>
      )}
    </div>
  )
}

export default Home
