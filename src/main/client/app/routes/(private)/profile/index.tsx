import { Navigate } from "react-router";
import { useAuthContext } from "~/providers/auth-provider";
import { CandidateProfile } from "./_components/candidate-profile";
import { Edit } from "lucide-react";
import { CompanyProfile } from "./_components/company-profile";
import { InteractiveAvatar } from "./_components/avatar";

export default function ProfilePage() {
  const { user } = useAuthContext();

  if (user === null) {
    return <Navigate to="/auth/login" replace />;
  }
  const getAvatarKey = () => {
    if (user.role === "COMPANY") return user.company.logoKey
    if (user.role === "CANDIDATE") return user.candidate.profilePictureKey
    return undefined
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="max-w-3xl w-full px-6">
        <div className="relative card shadow-xl bg-base-100">
          <div className="flex flex-wrap gap-2 justify-center absolute right-5 top-5">
            <button className="btn btn-primary btn-md">
              <Edit className="size-5" />
            </button>
          </div>
          <div className="card-body flex flex-col items-center">

            <InteractiveAvatar user={user} avatarKey={getAvatarKey()} />

            <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>

            <div className="divider my-6" />

            <div className="w-full">
              <h3 className="font-semibold text-lg mb-2">Profile Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600">Name</span>
                  <span className="text-base font-semibold">{user.name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-600">Email</span>
                  <span className="text-base font-semibold">{user.email}</span>
                </div>
              </div>
            </div>

            {user.role === "CANDIDATE" && <CandidateProfile data={user.candidate} />}
            {user.role === "COMPANY" && <CompanyProfile data={user.company} />}

          </div>
        </div>
      </div>
    </div>
  );
}

