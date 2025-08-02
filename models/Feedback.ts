import mongoose, { Document, Schema } from 'mongoose'

export interface IFeedback extends Document {
  from: mongoose.Types.ObjectId
  to: mongoose.Types.ObjectId
  content: string
  rating?: number
  createdAt: Date
  updatedAt: Date
}

const FeedbackSchema = new Schema<IFeedback>({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Feedback content is required'],
    trim: true,
    maxlength: [1000, 'Feedback cannot be more than 1000 characters']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  }
}, {
  timestamps: true
})

// Create indexes
FeedbackSchema.index({ from: 1 })
FeedbackSchema.index({ to: 1 })
FeedbackSchema.index({ createdAt: -1 })

// Compound index for feedback between two users
FeedbackSchema.index({ from: 1, to: 1 })

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema)