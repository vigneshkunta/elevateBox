'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { formatDateTime } from '@/lib/utils'
import { Post } from '@/types'

interface PostCardProps {
  post: Post
  onUpdate: (post: Post) => void
  onDelete: (postId: string) => void
}

export default function PostCard({ post, onUpdate, onDelete }: PostCardProps) {
  const { data: session } = useSession()
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isAuthor = session?.user?.id === post.author._id

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post._id,
          content: newComment.trim(),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        onUpdate(data.post)
        setNewComment('')
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePost = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`/api/posts/${post._id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        onDelete(post._id)
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {post.author.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{post.author.name}</h3>
              <p className="text-sm text-gray-500">
                {post.author.role} • {formatDateTime(post.createdAt)}
              </p>
            </div>
          </div>

          {isAuthor && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDeletePost}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          {post.title}
        </h2>

        <div className="prose max-w-none mb-4">
          <p className="text-gray-700">{post.content}</p>
        </div>

        {post.links.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Resources:</h4>
            <div className="space-y-1">
              {post.links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-700 text-sm truncate"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm">
              {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
            </span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="border-t border-gray-200 p-6">
          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-6">
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-xs">
                  {session?.user?.name?.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="textarea text-sm"
                  rows={3}
                  style={{
                    backgroundColor: '#fff',
                    color: '#000',
                    border: '1px solid #ccc',
                    padding: '8px',
                    width: '100%',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={!newComment.trim() || isSubmitting}
                    className="btn btn-primary text-sm disabled:opacity-50"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment._id} className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-xs">
                    {comment.author.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-gray-900">
                        {comment.author.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDateTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}