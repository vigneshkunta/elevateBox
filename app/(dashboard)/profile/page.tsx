import ProfileForm from '@/components/profile/ProfileForm'

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600">Update your personal information and preferences</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <ProfileForm />
      </div>
    </div>
  )
}