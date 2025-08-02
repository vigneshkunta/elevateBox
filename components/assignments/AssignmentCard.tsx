'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { formatDateTime } from '@/lib/utils'
import { Assignment } from '@/types'

interface AssignmentCardProps {
  assignment: Assignment
  onUpdate: (assignment: Assignment) => void
  onDelete: (assignmentId: string) => void
}

export default function AssignmentCard({ assignment, onUpdate, onDelete }: AssignmentCardProps) {
  const { data: session } = useSession()
  const [isToggling, setIsToggling] = useState(false)

  const isAuthor = session?.user?.id === assignment.createdBy._id
  const isCompleted = session?.user?.role === 'student' && 
    assignment.completedBy.some(completion => completion.student === session.user.id)

  const handleToggleCompletion = async () => {
    if (!session || session.user.role !== 'student') return

    setIsToggling(true)
    try {
      const method = isCompleted ? 'DELETE' : 'POST'
      const response = await fetch(`/api/assignments/${assignment._id}/complete`, {
        method,
      })

      if (response.ok) {
        // Refetch assignment data to get updated completion status
        const updatedResponse = await fetch(`/api/assignments/${assignment._id}`)
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json()
          onUpdate(updatedData.assignment)
        }
      }
    } catch (error) {
      console.error('Error toggling completion:', error)
    } finally {
      setIsToggling(false)
    }
  }

  const handleDeleteAssignment = async () => {
    if (!confirm('Are you sure you want to delete this assignment?')) return

    try {
      const response = await fetch(`/api/assignments/${assignment._id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        onDelete(assignment._id)
      }
    } catch (error) {
      console.error('Error deleting assignment:', error)
    }
  }

  const completionCount = assignment.completedBy.length

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {assignment.createdBy.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{assignment.createdBy.name}</h3>
              <p className="text-sm text-gray-500">
                Instructor • {formatDateTime(assignment.createdAt)}
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {assignment.title}
          </h2>

          <div className="prose max-w-none mb-4">
            <p className="text-gray-700">{assignment.description}</p>
          </div>

          {assignment.dueDate && (
            <div className="mb-4">
              <p className="text-sm text-red-600">
                Due: {formatDateTime(assignment.dueDate)}
              </p>
            </div>
          )}

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{completionCount} student{completionCount !== 1 ? 's' : ''} completed</span>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          {session?.user?.role === 'student' && (
            <button
              onClick={handleToggleCompletion}
              disabled={isToggling}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 ${
                isCompleted
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isCompleted ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Mark Complete</span>
                </>
              )}
            </button>
          )}

          {isAuthor && (
            <button
              onClick={handleDeleteAssignment}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}