import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      username: string
      role: 'instructor' | 'student'
      profilePicture: string
    }
  }

  interface User {
    id: string
    name: string
    email: string
    username: string
    role: 'instructor' | 'student'
    profilePicture: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    username: string
    profilePicture: string
  }
}