import nextAuth, { NextAuthOptions, Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NEXTAUTH_SECRET } from 'utill/dotenv'

const prisma: any = {}

type MyUser = {
  id: string
  name: string
  email: string
  nation: string
  myInputAccountInfo: {
    id: string
    password: string
    description: string
  }
}

declare module 'next-auth' {
  export interface Session {
    user: MyUser
    sub1: { hi: string }
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    user: MyUser
  }
}

const options: NextAuthOptions = {
  debug: false,
  secret: NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider( {
      name: '커스텀로그인',
      id: 'local',
      credentials: {
        id: { label: 'id', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize( credentials, req ) {
        return null
      },
    } ),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 3, // 3H
  },

  jwt: {
    maxAge: 60 * 60 * 6, // 6H
  },

  callbacks: {
    async session( { session, token } ) {
      if ( token ) {
        session.user = { ...token.user }
        session.sub1 = {
          hi: 'hello1',
        }
      }
      return session
    },
  },
}

export default nextAuth( options )
