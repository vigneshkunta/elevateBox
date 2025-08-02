import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Assignment from '@/models/Assignment'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'student') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    const assignment = await Assignment.findById(params.id)

    if (!assignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      )
    }

    // Check if already completed
    const alreadyCompleted = assignment.completedBy.some(
      (completion: any) => completion.student.toString() === session.user.id
    )

    if (alreadyCompleted) {
      return NextResponse.json(
        { error: 'Assignment already completed' },
        { status: 400 }
      )
    }

    // Add to completed list
    assignment.completedBy.push({
      student: session.user.id,
      completedAt: new Date()
    })

    await assignment.save()

    return NextResponse.json({
      message: 'Assignment marked as completed'
    })
  } catch (error) {
    console.error('Error completing assignment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'student') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    const assignment = await Assignment.findById(params.id)

    if (!assignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      )
    }

    // Remove from completed list
    assignment.completedBy = assignment.completedBy.filter(
      (completion: any) => completion.student.toString() !== session.user.id
    )

    await assignment.save()

    return NextResponse.json({
      message: 'Assignment marked as not completed'
    })
  } catch (error) {
    console.error('Error uncompleting assignment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}