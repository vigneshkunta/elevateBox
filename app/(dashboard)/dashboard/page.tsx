import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import DashboardStats from '@/components/dashboard/DashboardStats'
import RecentPosts from '@/components/dashboard/RecentPosts'
import RecentAssignments from '@/components/dashboard/RecentAssignments'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-gray-600">
          {session?.user?.role === 'instructor' 
            ? 'Manage your courses and track student progress'
            : 'Continue your learning journey'
          }
        </p>
      </div>

      <DashboardStats />

      <div className="grid lg:grid-cols-2 gap-6">
        <RecentPosts />
        <RecentAssignments />
      </div>
    </div>
  )
}