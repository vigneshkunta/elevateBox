'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Assignment } from '@/types'
import AssignmentCard from './AssignmentCard'

export default function AssignmentsList() {
  const { data: session } = useSession()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAssignments()
  }, [])

  const fetchAssignments = async () => {
    try {
      const response = await fetch('/api/assignments')
      if (response.ok) {
        const data = await response.json()
        setAssignments(data.assignments)
      }
    } catch (error) {
      console.error('Error fetching assignments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAssignmentUpdate = (updatedAssignment: Assignment) => {
    setAssignments(prev => prev.map(assignment => 
      assignment._id === updatedAssignment._id ? updatedAssignment : assignment
    ))
  }

  const handleAssignmentDelete = (assignmentId: string) => {
    setAssignments(prev => prev.filter(assignment => assignment._id !== assignmentId))
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {assignments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments yet</h3>
          <p className="text-gray-500">
            {session?.user?.role === 'instructor' 
              ? 'Create your first assignment to engage students.'
              : 'Check back later for new assignments from instructors.'
            }
          </p>
        </div>
      ) : (
        assignments.map((assignment) => (
          <AssignmentCard 
            key={assignment._id} 
            assignment={assignment}
            onUpdate={handleAssignmentUpdate}
            onDelete={handleAssignmentDelete}
          />
        ))
      )}
    </div>
  )
}