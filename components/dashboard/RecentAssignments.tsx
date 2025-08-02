'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { formatDateTime } from '@/lib/utils'
import { Assignment } from '@/types'

export default function RecentAssignments() {
  const { data: session } = useSession()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRecentAssignments()
  }, [])

  const fetchRecentAssignments = async () => {
    try {
      const response = await fetch('/api/assignments?limit=5')
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

  const isCompleted = (assignment: Assignment) => {
    if (session?.user?.role !== 'student') return false
    return assignment.completedBy.some(
      completion => completion.student === session.user.id
    )
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Assignments</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Recent Assignments</h3>
          <Link href="/assignments" className="text-sm text-blue-600 hover:text-blue-500">
            View all
          </Link>
        </div>
      </div>
      <div className="p-6">
        {assignments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No assignments yet</p>
        ) : (
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment._id} className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {assignment.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    by {assignment.createdBy.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDateTime(assignment.createdAt)}
                  </p>
                  {assignment.dueDate && (
                    <p className="text-xs text-red-500 mt-1">
                      Due: {formatDateTime(assignment.dueDate)}
                    </p>
                  )}
                </div>
                {session?.user?.role === 'student' && (
                  <div className="ml-4">
                    {isCompleted(assignment) ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}