import mongoose, { Document, Schema } from 'mongoose'

export interface IComment {
  content: string
  author: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt?: Date
}

export interface IPost extends Document {
  title: string
  content: string
  author: mongoose.Types.ObjectId
  links: string[]
  comments: IComment[]
  createdAt: Date
  updatedAt: Date
}

const CommentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot be more than 1000 characters']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [5000, 'Content cannot be more than 5000 characters']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  links: [{
    type: String,
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+/.test(v)
      },
      message: 'Links must be valid URLs'
    }
  }],
  comments: [CommentSchema]
}, {
  timestamps: true
})

// Create indexes
PostSchema.index({ author: 1 })
PostSchema.index({ createdAt: -1 })

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)