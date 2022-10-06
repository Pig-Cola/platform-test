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
        const { id, password } = credentials!
        const user = {
          id: 'maybeUserId',
          name: '이름',
          email: 'email@mail.com',
          nation: 'kr',
          myInputAccountInfo: { id, password, description: '내가 입력한 id, pw (실제로 존재하지 않을거임)' },
        }
        return user
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
    jwt( { token, user } ) {
      if ( user ) {
        const _user = user as MyUser
        token.user = _user
      }
      return token
    },
    async session( {session, token} ) {
      if ( token ) {
        session.user = { ...token.user }
      }
      return session
    },
  },
}

export default nextAuth( options )
