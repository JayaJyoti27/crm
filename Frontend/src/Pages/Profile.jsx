import React from "react";

const Profile = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
    }
  }, []);

  if (!user) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={user.photo || "https://via.placeholder.com/100"}
              alt="avatar"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">Sales</p>
            </div>
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-md">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-md">{user.phone || "No phone number"}</p>
          </div>
        </div>
      </div>

      {/* Account Stats */}
    </div>
  );
};

export default Profile;
