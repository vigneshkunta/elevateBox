'use client'

import { useState } from 'react'
import CreateAssignmentModal from './CreateAssignmentModal'

export default function CreateAssignmentButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-primary"
      >
        Create Assignment
      </button>

      <CreateAssignmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}