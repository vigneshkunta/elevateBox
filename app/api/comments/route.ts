import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { postId, content } = await request.json()

    if (!postId || !content) {
      return NextResponse.json(
        { error: 'Post ID and content are required' },
        { status: 400 }
      )
    }

    await connectDB()

    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const comment = {
      content,
      author: session.user.id,
      createdAt: new Date()
    }

    post.comments.push(comment)
    await post.save()

    const updatedPost = await Post.findById(postId)
      .populate('author', 'name username role')
      .populate('comments.author', 'name username')

    return NextResponse.json({
      message: 'Comment added successfully',
      post: updatedPost
    })
  } catch (error) {
    console.error('Error adding comment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}