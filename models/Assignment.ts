import mongoose, { Document, Schema } from 'mongoose'

export interface ICompletion {
  student: mongoose.Types.ObjectId
  completedAt: Date
}

export interface IAssignment extends Document {
  title: string
  description: string
  createdBy: mongoose.Types.ObjectId
  dueDate?: Date
  completedBy: ICompletion[]
  createdAt: Date
  updatedAt: Date
}

const CompletionSchema = new Schema<ICompletion>({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
})

const AssignmentSchema = new Schema<IAssignment>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dueDate: {
    type: Date
  },
  completedBy: [CompletionSchema]
}, {
  timestamps: true
})

// Create indexes
AssignmentSchema.index({ createdBy: 1 })
AssignmentSchema.index({ createdAt: -1 })
AssignmentSchema.index({ 'completedBy.student': 1 })

export default mongoose.models.Assignment || mongoose.model<IAssignment>('Assignment', AssignmentSchema)