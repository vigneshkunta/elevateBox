import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import PostsList from '@/components/posts/PostsList'
import CreatePostButton from '@/components/posts/CreatePostButton'

export default async function PostsPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-600">
            {session?.user?.role === 'instructor' 
              ? 'Share your daily teaching updates and resources'
              : 'View and interact with instructor posts'
            }
          </p>
        </div>

        {session?.user?.role === 'instructor' && <CreatePostButton />}
      </div>

      <PostsList />
    </div>
  )
}