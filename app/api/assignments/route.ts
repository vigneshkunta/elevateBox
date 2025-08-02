import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Assignment from '@/models/Assignment'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    let query = {}

    // If student, only show assignments they need to complete
    if (session.user.role === 'student') {
      // Show all assignments for now - can be filtered by course/instructor later
    } else if (session.user.role === 'instructor') {
      // Show only assignments created by this instructor
      query = { createdBy: session.user.id }
    }

    const assignments = await Assignment.find(query)
      .populate('createdBy', 'name username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Assignment.countDocuments(query)

    return NextResponse.json({
      assignments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching assignments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'instructor') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { title, description, dueDate } = await request.json()

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    await connectDB()

    const assignment = await Assignment.create({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      createdBy: session.user.id,
    })

    const populatedAssignment = await Assignment.findById(assignment._id)
      .populate('createdBy', 'name username')

    return NextResponse.json(
      { message: 'Assignment created successfully', assignment: populatedAssignment },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating assignment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}