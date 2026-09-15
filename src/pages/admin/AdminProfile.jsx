import { useState } from "react";
import {
  User,
  Mail,
  ShieldCheck,
  Building2,
  Save,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import "./AdminProfile.css";

function AdminProfile() {
  const [profile, setProfile] = useState(() => {
  const savedProfile =
    localStorage.getItem("adminProfile");

  return savedProfile
    ? JSON.parse(savedProfile)
    : {
        name: "Super Admin",
        email: "admin@talentai.com",
        role: "Super Admin",
        department: "Administration",
      };
});

  const [savedMessage, setSavedMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "adminProfile",
      JSON.stringify(profile)
    );
    window.dispatchEvent(
  new Event("adminProfileUpdated")
);

    setSavedMessage("Profile updated successfully.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  return (
    <div className="admin-profile-page-layout">
      <AdminSidebar />

      <div className="admin-profile-page-main">
        <AdminNavbar />

        <main className="admin-profile-page-content">
          <div className="admin-profile-page-header">
            <p>ACCOUNT</p>

            <h1>My Profile</h1>

            <span>
              View and update your administrator profile.
            </span>
          </div>

          <section className="admin-profile-card">
            <div className="admin-profile-card-top">
              <div className="admin-profile-large-avatar">
                SA
              </div>

              <div>
                <h2>{profile.name}</h2>
                <p>{profile.email}</p>

                <span className="admin-profile-role-badge">
                  {profile.role}
                </span>
              </div>
            </div>

            {savedMessage && (
              <div className="admin-profile-success">
                {savedMessage}
              </div>
            )}

            <form
              className="admin-profile-form"
              onSubmit={handleSave}
            >
              <div className="admin-profile-form-group">
                <label>
                  <User size={17} />
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-profile-form-group">
                <label>
                  <Mail size={17} />
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-profile-form-row">
                <div className="admin-profile-form-group">
                  <label>
                    <ShieldCheck size={17} />
                    Role
                  </label>

                  <input
                    type="text"
                    value={profile.role}
                    disabled
                  />
                </div>

                <div className="admin-profile-form-group">
                  <label>
                    <Building2 size={17} />
                    Department
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={profile.department}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="admin-profile-form-actions">
                <button type="submit">
                  <Save size={17} />
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminProfile;