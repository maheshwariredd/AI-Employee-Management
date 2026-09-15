import { useMemo, useState } from "react";
import {
  ShieldCheck,
  Plus,
  Pencil,
  Trash2,
  Users,
  X,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

import "./AdminRoles.css";

function AdminRoles() {
  const defaultRoles = [
    {
      id: 1,
      name: "Super Admin",
      description: "Full access to all system modules and settings.",
      users: 1,
      status: "Active",
    },
    {
      id: 2,
      name: "HR Manager",
      description:
        "Manage recruitment, employees, interviews, offers and HR operations.",
      users: 3,
      status: "Active",
    },
    {
      id: 3,
      name: "Recruiter",
      description:
        "Manage candidates, resumes, shortlisting and interview scheduling.",
      users: 5,
      status: "Active",
    },
    {
      id: 4,
      name: "Hiring Manager",
      description:
        "Review shortlisted candidates and provide hiring decisions.",
      users: 2,
      status: "Active",
    },
    {
      id: 5,
      name: "Interviewer",
      description:
        "View assigned interviews and submit candidate evaluations.",
      users: 4,
      status: "Active",
    },
    {
      id: 6,
      name: "Employee",
      description:
        "Access profile, attendance, leave and performance information.",
      users: 15,
      status: "Active",
    },
  ];

  const [roles, setRoles] = useState(() => {
    const savedRoles = localStorage.getItem("adminRoles");

    return savedRoles
      ? JSON.parse(savedRoles)
      : defaultRoles;
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingRole, setEditingRole] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  const filteredRoles = useMemo(() => {
    const value = searchTerm.toLowerCase().trim();

    if (!value) {
      return roles;
    }

    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(value) ||
        role.description.toLowerCase().includes(value)
    );
  }, [roles, searchTerm]);

  const saveRoles = (updatedRoles) => {
    setRoles(updatedRoles);

    localStorage.setItem(
      "adminRoles",
      JSON.stringify(updatedRoles)
    );
  };

  const openCreateModal = () => {
    setEditingRole(null);

    setFormData({
      name: "",
      description: "",
      status: "Active",
    });

    setShowModal(true);
  };

  const openEditModal = (role) => {
    setEditingRole(role);

    setFormData({
      name: role.name,
      description: role.description,
      status: role.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRole(null);

    setFormData({
      name: "",
      description: "",
      status: "Active",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Role name is required.");
      return;
    }

    if (editingRole) {
      const updatedRoles = roles.map((role) =>
        role.id === editingRole.id
          ? {
              ...role,
              ...formData,
            }
          : role
      );

      saveRoles(updatedRoles);
    } else {
      const newRole = {
        id: Date.now(),
        ...formData,
        users: 0,
      };

      saveRoles([newRole, ...roles]);
    }

    closeModal();
  };

  const deleteRole = (role) => {
    if (role.name === "Super Admin") {
      alert("Super Admin role cannot be deleted.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${role.name}?`
    );

    if (!confirmed) {
      return;
    }

    const updatedRoles = roles.filter(
      (item) => item.id !== role.id
    );

    saveRoles(updatedRoles);
  };

  const activeRoles = roles.filter(
    (role) => role.status === "Active"
  ).length;

  const assignedUsers = roles.reduce(
    (total, role) => total + role.users,
    0
  );

  return (
    <div className="admin-roles-layout">
      <AdminSidebar />

      <div className="admin-roles-main">
        <AdminNavbar />

        <main className="admin-roles-content">
          <div className="admin-roles-header">
            <div>
              <p>ACCESS MANAGEMENT</p>

              <h1>Roles</h1>

              <span>
                Manage platform roles and access levels.
              </span>
            </div>

            <button
              className="admin-add-role-button"
              onClick={openCreateModal}
            >
              <Plus size={18} />
              Add Role
            </button>
          </div>

          <div className="admin-role-stats">
            <div className="admin-role-stat-card">
              <div className="admin-role-stat-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <span>Total Roles</span>
                <strong>{roles.length}</strong>
              </div>
            </div>

            <div className="admin-role-stat-card">
              <div className="admin-role-stat-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <span>Active Roles</span>
                <strong>{activeRoles}</strong>
              </div>
            </div>

            <div className="admin-role-stat-card">
              <div className="admin-role-stat-icon">
                <Users size={22} />
              </div>

              <div>
                <span>Assigned Users</span>
                <strong>{assignedUsers}</strong>
              </div>
            </div>
          </div>

          <section className="admin-roles-card">
            <div className="admin-roles-toolbar">
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>

            <div className="admin-roles-table-wrapper">
              <table className="admin-roles-table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Description</th>
                    <th>Users</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRoles.length > 0 ? (
                    filteredRoles.map((role) => (
                      <tr key={role.id}>
                        <td>
                          <div className="admin-role-name">
                            <div className="admin-role-avatar">
                              <ShieldCheck size={18} />
                            </div>

                            <strong>
                              {role.name}
                            </strong>
                          </div>
                        </td>

                        <td>
                          <span className="admin-role-description">
                            {role.description}
                          </span>
                        </td>

                        <td>
                          {role.users}
                        </td>

                        <td>
                          <span
                            className={`admin-role-status ${
                              role.status === "Active"
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            {role.status}
                          </span>
                        </td>

                        <td>
                          <div className="admin-role-actions">
                            <button
                              title="Edit role"
                              onClick={() =>
                                openEditModal(role)
                              }
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              title="Delete role"
                              className="delete"
                              onClick={() =>
                                deleteRole(role)
                              }
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="admin-role-empty"
                      >
                        No roles found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {showModal && (
        <div className="admin-role-modal-overlay">
          <div className="admin-role-modal">
            <div className="admin-role-modal-header">
              <div>
                <h2>
                  {editingRole
                    ? "Edit Role"
                    : "Add Role"}
                </h2>

                <p>
                  Configure role details and status.
                </p>
              </div>

              <button
                className="admin-role-modal-close"
                onClick={closeModal}
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-role-form-group">
                <label>Role Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter role name"
                />
              </div>

              <div className="admin-role-form-group">
                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter role description"
                  rows="4"
                />
              </div>

              <div className="admin-role-form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>

              <div className="admin-role-modal-actions">
                <button
                  type="button"
                  className="cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save"
                >
                  {editingRole
                    ? "Update Role"
                    : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRoles;