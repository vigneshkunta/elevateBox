'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { getInitials } from '@/lib/utils'

export default function Navbar() {
  const { data: session } = useSession()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <img
              src="https://media.licdn.com/dms/image/v2/D560BAQFa5xRvyLrZ7g/company-logo_200_200/company-logo_200_200/0/1719379322506/elevatebox_logo?e=2147483647&v=beta&t=uPk-uTD-bgxcLvNLopalSUPdbsE4hCL3MGnb8gQZkcc"
              alt="elevateBox Logo"
              className="h-10 w-10 rounded-full object-contain shadow-sm"
              loading="lazy"
              draggable={false}
            />
            <h1 className="text-xl font-bold text-indigo-600">
              elevateBox
            </h1>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {session?.user?.profilePicture ? (
                  <Image
                    src={session.user.profilePicture}
                    alt={session.user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {getInitials(session?.user?.name || 'U')}
                  </div>
                )}
                <span className="hidden md:block text-gray-700 font-medium">
                  {session?.user?.name}
                </span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                    <div className="font-medium text-gray-900">{session?.user?.name}</div>
                    <div className="text-xs">{session?.user?.email}</div>
                    <div className="text-xs capitalize font-medium text-blue-600 mt-1">
                      {session?.user?.role}
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
