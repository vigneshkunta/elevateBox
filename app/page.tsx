import Link from 'next/link'
import Header from '@/components/Header'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col justify-center">
        <section className="max-w-4xl mx-auto px-6 pt-16 pb-24 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl leading-tight mb-6 drop-shadow-sm">
            Welcome to ElevateBox
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-700 mb-12 leading-relaxed">
            Connect instructors and students in a collaborative learning environment. 
            Share knowledge, track progress, and engage with educational content.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <Link
              href="/login"
              className="inline-block px-10 py-3 font-semibold rounded-lg bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup/instructor"
                className="inline-block px-8 py-3 font-semibold rounded-lg bg-green-600 text-white shadow-md hover:bg-green-700 transition"
              >
                Sign up as Instructor
              </Link>
              <Link
                href="/signup/student"
                className="inline-block px-8 py-3 font-semibold rounded-lg bg-purple-600 text-white shadow-md hover:bg-purple-700 transition"
              >
                Sign up as Student
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 grid gap-8 sm:grid-cols-2 md:grid-cols-3 mb-28">
          {/* Card 1 - Instructors */}
          <article className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border border-indigo-100 hover:shadow-2xl hover:border-indigo-300 transition">
            <div className="text-indigo-600 mb-5">
              <svg
                className="mx-auto h-14 w-14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">For Instructors</h3>
            <p className="text-gray-600 leading-relaxed">
              Share daily lessons, upload resources, create assignments, and provide feedback to students.
            </p>
          </article>

          {/* Card 2 - Students */}
          <article className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border border-green-100 hover:shadow-2xl hover:border-green-300 transition">
            <div className="text-green-600 mb-5">
              <svg
                className="mx-auto h-14 w-14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">For Students</h3>
            <p className="text-gray-600 leading-relaxed">
              Access learning materials, complete assignments, engage in discussions, and track your progress.
            </p>
          </article>

          {/* Card 3 - Interactive Learning */}
          <article className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border border-purple-100 hover:shadow-2xl hover:border-purple-300 transition">
            <div className="text-purple-600 mb-5">
              <svg
                className="mx-auto h-14 w-14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2v4z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">Interactive Learning</h3>
            <p className="text-gray-600 leading-relaxed">
              Comment on posts, provide feedback, and collaborate in a supportive learning community.
            </p>
          </article>
        </section>
      </main>
    </>
  )
}
