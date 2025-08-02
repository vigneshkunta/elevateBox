import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import AssignmentsList from '@/components/assignments/AssignmentsList'
import CreateAssignmentButton from '@/components/assignments/CreateAssignmentButton'

export default async function AssignmentsPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600">
            {session?.user?.role === 'instructor' 
              ? 'Create and manage assignments for students'
              : 'View and complete your assignments'
            }
          </p>
        </div>

        {session?.user?.role === 'instructor' && <CreateAssignmentButton />}
      </div>

      <AssignmentsList />
    </div>
  )
}