import { useSelector } from 'react-redux';
import { User, Mail, MapPin, Book, Tag } from 'lucide-react';

export default function Profile() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <h2 className="text-3xl font-bold mb-2">User Profile</h2>
        <p className="text-gray-100">{userInfo?.user?.email}</p>
      </div>
      <div className="p-6">
        <div className="space-y-8">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h3 className="text-2xl font-semibold text-gray-800">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField
              icon={<User className="w-5 h-5 text-gray-500" />}
              label="Name"
              value={userInfo?.user?.name}
            />
            <ProfileField
              icon={<Mail className="w-5 h-5 text-gray-500" />}
              label="Email"
              value={userInfo?.user?.email}
            />
            <ProfileField
              icon={<MapPin className="w-5 h-5 text-gray-500" />}
              label="Location"
              value={userInfo?.user?.location}
            />
          </div>
          <ProfileField
            icon={<Book className="w-5 h-5 text-gray-500" />}
            label="Bio"
            value={userInfo?.user?.bio}
          />
          <div>
            <div className="flex items-center mb-2">
              <Tag className="w-5 h-5 text-gray-500 mr-2" />
              <p className="text-sm font-medium text-gray-500">Interests</p>
            </div>
            <div className="mt-1 flex flex-wrap gap-2">
              {userInfo?.user?.interests?.map((interest, index) => (
                <span key={index} className="bg-blue-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                  {interest}
                </span>
              )) || <span className="text-gray-500 italic">No interests found</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileField({ icon, label, value }) {
  return (
    <div>
      <div className="flex items-center mb-2">
        {icon}
        <p className="text-sm font-medium text-gray-500 ml-2">{label}</p>
      </div>
      <p className="text-gray-800">{value || "No data found"}</p>
    </div>
  );
}

