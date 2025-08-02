export interface User {
  _id: string
  name: string
  username: string
  email: string
  role: 'instructor' | 'student'
  profilePicture: string
  bio: string
  createdAt: string
  updatedAt: string
}

export interface Post {
  _id: string
  title: string
  content: string
  author: {
    _id: string
    name: string
    username: string
    role: string
  }
  links: string[]
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

export interface Comment {
  _id: string
  content: string
  author: {
    _id: string
    name: string
    username: string
  }
  createdAt: string
  updatedAt: string
}

export interface Assignment {
  _id: string
  title: string
  description: string
  createdBy: {
    _id: string
    name: string
    username: string
  }
  dueDate?: string
  completedBy: {
    student: string
    completedAt: string
  }[]
  createdAt: string
  updatedAt: string
}

export interface Feedback {
  _id: string
  from: {
    _id: string
    name: string
    username: string
    role: string
  }
  to: {
    _id: string
    name: string
    username: string
    role: string
  }
  content: string
  rating?: number
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T = any> {
  message?: string
  error?: string
  data?: T
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  pages: number
}