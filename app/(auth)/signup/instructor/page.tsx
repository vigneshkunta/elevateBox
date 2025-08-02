import SignupForm from "@/components/auth/SignupForm";
import Header from "@/components/Header";

export default function InstructorSignupPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Join as an Instructor
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Share your knowledge and guide students
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <SignupForm role="instructor" />
          </div>
        </div>
      </div>
    </>
  );
}
