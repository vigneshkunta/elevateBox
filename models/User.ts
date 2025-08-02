import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  username: string
  email: string
  password: string
  role: 'instructor' | 'student'
  profilePicture?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot be more than 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['instructor', 'student'],
    required: [true, 'Role is required']
  },
  profilePicture: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters'],
    default: ''
  }
}, {
  timestamps: true
})

// Create indexes
UserSchema.index({ email: 1 })
UserSchema.index({ username: 1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)