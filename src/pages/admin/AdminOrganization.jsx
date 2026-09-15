import { useState } from "react";
import {
  Building2,
  BadgeCheck,
  MapPin,
  Users,
  Network,
  Plus,
Pencil,
Trash2,
Search,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { useAdmin } from "../../context/AdminContext";
import "./AdminOrganization.css";

function AdminOrganization() {
  const [activeTab, setActiveTab] =
    useState("company");
    const { addAuditLog } = useAdmin();

const [designations, setDesignations] = useState(() => {
  const savedDesignations =
    localStorage.getItem("adminDesignations");

  return savedDesignations
    ? JSON.parse(savedDesignations)
    : [];
});

const [designationSearch, setDesignationSearch] =
  useState("");

const [designationForm, setDesignationForm] =
  useState({
    name: "",
    description: "",
  });

const [editingDesignation, setEditingDesignation] =
  useState(null);
  const [companyProfile, setCompanyProfile] = useState(() => {
  const savedProfile =
    localStorage.getItem("adminCompanyProfile");

  return savedProfile
    ? JSON.parse(savedProfile)
    : {
        companyName: "",
        email: "",
        phone: "",
        website: "",
        address: "",
        description: "",
      };
});
const [locations, setLocations] = useState(() => {
  const savedLocations =
    localStorage.getItem("adminLocations");

  return savedLocations
    ? JSON.parse(savedLocations)
    : [];
});

const [locationSearch, setLocationSearch] =
  useState("");

const [locationForm, setLocationForm] = useState({
  name: "",
  city: "",
  state: "",
  country: "",
});

const [editingLocation, setEditingLocation] =
  useState(null);
  const [teams, setTeams] = useState(() => {
  const savedTeams =
    localStorage.getItem("adminTeams");

  return savedTeams
    ? JSON.parse(savedTeams)
    : [];
});

const [teamSearch, setTeamSearch] =
  useState("");

const [teamForm, setTeamForm] = useState({
  name: "",
  department: "",
  description: "",
});

const [editingTeam, setEditingTeam] =
  useState(null);

const [companyMessage, setCompanyMessage] =
  useState("");

const handleCompanyChange = (e) => {
  const { name, value } = e.target;

  setCompanyProfile((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const [hierarchy, setHierarchy] = useState(() => {
  const savedHierarchy =
    localStorage.getItem("adminReportingHierarchy");

  return savedHierarchy
    ? JSON.parse(savedHierarchy)
    : [];
});

const [hierarchyForm, setHierarchyForm] = useState({
  role: "",
  reportsTo: "",
});

const [editingHierarchy, setEditingHierarchy] =
  useState(null);
const handleCompanySave = (e) => {
  e.preventDefault();

  localStorage.setItem(
    "adminCompanyProfile",
    JSON.stringify(companyProfile)
  );

  setCompanyMessage(
    "Company profile saved successfully."
  );

  setTimeout(() => {
    setCompanyMessage("");
  }, 3000);
};
const handleDesignationChange = (e) => {
  const { name, value } = e.target;

  setDesignationForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const resetDesignationForm = () => {
  setDesignationForm({
    name: "",
    description: "",
  });

  setEditingDesignation(null);
};

const handleDesignationSubmit = (e) => {
  e.preventDefault();

  if (!designationForm.name.trim()) {
    return;
  }

  if (editingDesignation) {
    const updatedDesignations = designations.map(
      (designation) =>
        designation.id === editingDesignation.id
          ? {
              ...designation,
              ...designationForm,
            }
          : designation
    );

    setDesignations(updatedDesignations);

    localStorage.setItem(
      "adminDesignations",
      JSON.stringify(updatedDesignations)
    );

    addAuditLog(
      "Organization",
      "Designation Updated",
      `${designationForm.name} designation updated`,
      "Update"
    );
  } else {
    const newDesignation = {
      id: Date.now(),
      ...designationForm,
    };

    const updatedDesignations = [
      newDesignation,
      ...designations,
    ];

    setDesignations(updatedDesignations);

    localStorage.setItem(
      "adminDesignations",
      JSON.stringify(updatedDesignations)
    );

    addAuditLog(
      "Organization",
      "Designation Created",
      `${designationForm.name} designation created`,
      "Create"
    );
  }

  resetDesignationForm();
};

const handleEditDesignation = (designation) => {
  setEditingDesignation(designation);

  setDesignationForm({
    name: designation.name,
    description: designation.description || "",
  });
};

const handleDeleteDesignation = (designation) => {
  const updatedDesignations =
    designations.filter(
      (item) => item.id !== designation.id
    );

  setDesignations(updatedDesignations);

  localStorage.setItem(
    "adminDesignations",
    JSON.stringify(updatedDesignations)
  );

  addAuditLog(
    "Organization",
    "Designation Deleted",
    `${designation.name} designation deleted`,
    "Delete"
  );

  if (
    editingDesignation?.id === designation.id
  ) {
    resetDesignationForm();
  }
};

const filteredDesignations =
  designations.filter((designation) =>
    designation.name
      .toLowerCase()
      .includes(
        designationSearch.toLowerCase()
      )
  );
  const handleLocationChange = (e) => {
  const { name, value } = e.target;

  setLocationForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const resetLocationForm = () => {
  setLocationForm({
    name: "",
    city: "",
    state: "",
    country: "",
  });

  setEditingLocation(null);
};

const handleLocationSubmit = (e) => {
  e.preventDefault();

  if (
    !locationForm.name.trim() ||
    !locationForm.city.trim() ||
    !locationForm.country.trim()
  ) {
    return;
  }

  if (editingLocation) {
    const updatedLocations = locations.map(
      (location) =>
        location.id === editingLocation.id
          ? {
              ...location,
              ...locationForm,
            }
          : location
    );

    setLocations(updatedLocations);

    localStorage.setItem(
      "adminLocations",
      JSON.stringify(updatedLocations)
    );

    addAuditLog(
      "Organization",
      "Location Updated",
      `${locationForm.name} location updated`,
      "Update"
    );
  } else {
    const newLocation = {
      id: Date.now(),
      ...locationForm,
    };

    const updatedLocations = [
      newLocation,
      ...locations,
    ];

    setLocations(updatedLocations);

    localStorage.setItem(
      "adminLocations",
      JSON.stringify(updatedLocations)
    );

    addAuditLog(
      "Organization",
      "Location Created",
      `${locationForm.name} location created`,
      "Create"
    );
  }

  resetLocationForm();
};

const handleEditLocation = (location) => {
  setEditingLocation(location);

  setLocationForm({
    name: location.name,
    city: location.city,
    state: location.state || "",
    country: location.country,
  });
};

const handleDeleteLocation = (location) => {
  const updatedLocations = locations.filter(
    (item) => item.id !== location.id
  );

  setLocations(updatedLocations);

  localStorage.setItem(
    "adminLocations",
    JSON.stringify(updatedLocations)
  );

  addAuditLog(
    "Organization",
    "Location Deleted",
    `${location.name} location deleted`,
    "Delete"
  );

  if (editingLocation?.id === location.id) {
    resetLocationForm();
  }
};

const filteredLocations = locations.filter(
  (location) => {
    const search = locationSearch.toLowerCase();

    return (
      location.name.toLowerCase().includes(search) ||
      location.city.toLowerCase().includes(search) ||
      location.state
        .toLowerCase()
        .includes(search) ||
      location.country
        .toLowerCase()
        .includes(search)
    );
  }
);
const handleTeamChange = (e) => {
  const { name, value } = e.target;

  setTeamForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const resetTeamForm = () => {
  setTeamForm({
    name: "",
    department: "",
    description: "",
  });

  setEditingTeam(null);
};

const handleTeamSubmit = (e) => {
  e.preventDefault();

  if (
    !teamForm.name.trim() ||
    !teamForm.department.trim()
  ) {
    return;
  }

  if (editingTeam) {
    const updatedTeams = teams.map((team) =>
      team.id === editingTeam.id
        ? {
            ...team,
            ...teamForm,
          }
        : team
    );

    setTeams(updatedTeams);

    localStorage.setItem(
      "adminTeams",
      JSON.stringify(updatedTeams)
    );

    addAuditLog(
      "Organization",
      "Team Updated",
      `${teamForm.name} team updated`,
      "Update"
    );
  } else {
    const newTeam = {
      id: Date.now(),
      ...teamForm,
    };

    const updatedTeams = [
      newTeam,
      ...teams,
    ];

    setTeams(updatedTeams);

    localStorage.setItem(
      "adminTeams",
      JSON.stringify(updatedTeams)
    );

    addAuditLog(
      "Organization",
      "Team Created",
      `${teamForm.name} team created`,
      "Create"
    );
  }

  resetTeamForm();
};

const handleEditTeam = (team) => {
  setEditingTeam(team);

  setTeamForm({
    name: team.name,
    department: team.department,
    description: team.description || "",
  });
};

const handleDeleteTeam = (team) => {
  const updatedTeams = teams.filter(
    (item) => item.id !== team.id
  );

  setTeams(updatedTeams);

  localStorage.setItem(
    "adminTeams",
    JSON.stringify(updatedTeams)
  );

  addAuditLog(
    "Organization",
    "Team Deleted",
    `${team.name} team deleted`,
    "Delete"
  );

  if (editingTeam?.id === team.id) {
    resetTeamForm();
  }
};

const filteredTeams = teams.filter((team) => {
  const search = teamSearch.toLowerCase();

  return (
    team.name.toLowerCase().includes(search) ||
    team.department.toLowerCase().includes(search) ||
    team.description
      .toLowerCase()
      .includes(search)
  );
});
const handleHierarchyChange = (e) => {
  const { name, value } = e.target;

  setHierarchyForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const resetHierarchyForm = () => {
  setHierarchyForm({
    role: "",
    reportsTo: "",
  });

  setEditingHierarchy(null);
};

const handleHierarchySubmit = (e) => {
  e.preventDefault();

  if (
    !hierarchyForm.role.trim() ||
    !hierarchyForm.reportsTo.trim()
  ) {
    return;
  }

  if (editingHierarchy) {
    const updatedHierarchy = hierarchy.map(
      (item) =>
        item.id === editingHierarchy.id
          ? {
              ...item,
              ...hierarchyForm,
            }
          : item
    );

    setHierarchy(updatedHierarchy);

    localStorage.setItem(
      "adminReportingHierarchy",
      JSON.stringify(updatedHierarchy)
    );

    addAuditLog(
      "Organization",
      "Reporting Hierarchy Updated",
      `${hierarchyForm.role} reports to ${hierarchyForm.reportsTo}`,
      "Update"
    );
  } else {
    const newHierarchy = {
      id: Date.now(),
      ...hierarchyForm,
    };

    const updatedHierarchy = [
      newHierarchy,
      ...hierarchy,
    ];

    setHierarchy(updatedHierarchy);

    localStorage.setItem(
      "adminReportingHierarchy",
      JSON.stringify(updatedHierarchy)
    );

    addAuditLog(
      "Organization",
      "Reporting Hierarchy Created",
      `${hierarchyForm.role} reports to ${hierarchyForm.reportsTo}`,
      "Create"
    );
  }

  resetHierarchyForm();
};

const handleEditHierarchy = (item) => {
  setEditingHierarchy(item);

  setHierarchyForm({
    role: item.role,
    reportsTo: item.reportsTo,
  });
};

const handleDeleteHierarchy = (item) => {
  const updatedHierarchy = hierarchy.filter(
    (hierarchyItem) =>
      hierarchyItem.id !== item.id
  );

  setHierarchy(updatedHierarchy);

  localStorage.setItem(
    "adminReportingHierarchy",
    JSON.stringify(updatedHierarchy)
  );

  addAuditLog(
    "Organization",
    "Reporting Hierarchy Deleted",
    `${item.role} reporting relationship deleted`,
    "Delete"
  );

  if (editingHierarchy?.id === item.id) {
    resetHierarchyForm();
  }
};
  const tabs = [
    {
      id: "company",
      label: "Company Profile",
      icon: Building2,
    },
    {
      id: "designations",
      label: "Designations",
      icon: BadgeCheck,
    },
    {
      id: "locations",
      label: "Locations",
      icon: MapPin,
    },
    {
      id: "teams",
      label: "Teams",
      icon: Users,
    },
    {
      id: "hierarchy",
      label: "Reporting Hierarchy",
      icon: Network,
    },
  ];

  const getTitle = () => {
    return tabs.find(
      (tab) => tab.id === activeTab
    )?.label;
  };

  return (
    <div className="admin-organization-layout">
      <AdminSidebar />

      <div className="admin-organization-main">
        <AdminNavbar />

        <main className="admin-organization-content">
          <div className="admin-organization-header">
            <div>
              <p>ORGANIZATION MANAGEMENT</p>

              <h1>Organization</h1>

              <span>
                Manage company structure, locations,
                teams and reporting hierarchy.
              </span>
            </div>
          </div>

          <div className="admin-organization-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  className={
                    activeTab === tab.id
                      ? "admin-org-tab active"
                      : "admin-org-tab"
                  }
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                >
                  <Icon size={18} />

                  {tab.label}
                </button>
              );
            })}
          </div>

          <section className="admin-organization-card">
            <div className="admin-org-card-header">
              <h2>{getTitle()}</h2>

              <p>
                Manage organization{" "}
                {getTitle()?.toLowerCase()} information.
              </p>
            </div>

            {activeTab === "company" && (
  <form
    className="admin-company-form"
    onSubmit={handleCompanySave}
  >
    <div className="admin-company-form-grid">
      <div className="admin-company-field">
        <label>Company Name</label>
        <input
          type="text"
          name="companyName"
          value={companyProfile.companyName}
          onChange={handleCompanyChange}
          placeholder="Enter company name"
          required
        />
      </div>

      <div className="admin-company-field">
        <label>Company Email</label>
        <input
          type="email"
          name="email"
          value={companyProfile.email}
          onChange={handleCompanyChange}
          placeholder="company@example.com"
          required
        />
      </div>

      <div className="admin-company-field">
        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={companyProfile.phone}
          onChange={handleCompanyChange}
          placeholder="Enter phone number"
        />
      </div>

      <div className="admin-company-field">
        <label>Website</label>
        <input
          type="text"
          name="website"
          value={companyProfile.website}
          onChange={handleCompanyChange}
          placeholder="https://example.com"
        />
      </div>

      <div className="admin-company-field full-width">
        <label>Company Address</label>
        <textarea
          name="address"
          value={companyProfile.address}
          onChange={handleCompanyChange}
          placeholder="Enter company address"
          rows="3"
        />
      </div>

      <div className="admin-company-field full-width">
        <label>Company Description</label>
        <textarea
          name="description"
          value={companyProfile.description}
          onChange={handleCompanyChange}
          placeholder="Enter a short company description"
          rows="4"
        />
      </div>
    </div>

    {companyMessage && (
      <div className="admin-company-success">
        {companyMessage}
      </div>
    )}

    <div className="admin-company-actions">
      <button
        type="submit"
        className="admin-company-save"
      >
        Save Changes
      </button>
    </div>
  </form>
)}

{activeTab === "designations" && (
  <div className="admin-designation-section">

    <form
      className="admin-designation-form"
      onSubmit={handleDesignationSubmit}
    >
      <div className="admin-designation-form-header">
        <h3>
          {editingDesignation
            ? "Edit Designation"
            : "Add Designation"}
        </h3>
      </div>

      <div className="admin-designation-form-grid">
        <div className="admin-company-field">
          <label>Designation Name</label>

          <input
            type="text"
            name="name"
            value={designationForm.name}
            onChange={handleDesignationChange}
            placeholder="Example: Software Engineer"
            required
          />
        </div>

        <div className="admin-company-field">
          <label>Description</label>

          <input
            type="text"
            name="description"
            value={designationForm.description}
            onChange={handleDesignationChange}
            placeholder="Short description"
          />
        </div>
      </div>

      <div className="admin-designation-actions">
        {editingDesignation && (
          <button
            type="button"
            className="admin-designation-cancel"
            onClick={resetDesignationForm}
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="admin-company-save"
        >
          <Plus size={17} />

          {editingDesignation
            ? "Update Designation"
            : "Add Designation"}
        </button>
      </div>
    </form>

    <div className="admin-designation-list">

      <div className="admin-designation-toolbar">
        <h3>
          Designations ({designations.length})
        </h3>

        <div className="admin-designation-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search designations..."
            value={designationSearch}
            onChange={(e) =>
              setDesignationSearch(
                e.target.value
              )
            }
          />
        </div>
      </div>

      {filteredDesignations.length > 0 ? (
        <div className="admin-designation-table-wrapper">
          <table className="admin-designation-table">
            <thead>
              <tr>
                <th>Designation</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDesignations.map(
                (designation) => (
                  <tr key={designation.id}>
                    <td>
                      <strong>
                        {designation.name}
                      </strong>
                    </td>

                    <td>
                      {designation.description ||
                        "—"}
                    </td>

                    <td>
                      <div className="admin-designation-row-actions">
                        <button
                          type="button"
                          title="Edit designation"
                          onClick={() =>
                            handleEditDesignation(
                              designation
                            )
                          }
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          className="delete"
                          title="Delete designation"
                          onClick={() =>
                            handleDeleteDesignation(
                              designation
                            )
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-org-placeholder">
          <BadgeCheck size={36} />

          <h3>No designations found</h3>

          <p>
            Add your first designation above.
          </p>
        </div>
      )}
    </div>
  </div>
)}
{activeTab === "locations" && (
  <div className="admin-designation-section">

    <form
      className="admin-designation-form"
      onSubmit={handleLocationSubmit}
    >
      <div className="admin-designation-form-header">
        <h3>
          {editingLocation
            ? "Edit Location"
            : "Add Location"}
        </h3>
      </div>

      <div className="admin-location-form-grid">

        <div className="admin-company-field">
          <label>Location Name</label>
          <input
            type="text"
            name="name"
            value={locationForm.name}
            onChange={handleLocationChange}
            placeholder="Example: Hyderabad Office"
            required
          />
        </div>

        <div className="admin-company-field">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={locationForm.city}
            onChange={handleLocationChange}
            placeholder="Hyderabad"
            required
          />
        </div>

        <div className="admin-company-field">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={locationForm.state}
            onChange={handleLocationChange}
            placeholder="Telangana"
          />
        </div>

        <div className="admin-company-field">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={locationForm.country}
            onChange={handleLocationChange}
            placeholder="India"
            required
          />
        </div>

      </div>

      <div className="admin-designation-actions">
        {editingLocation && (
          <button
            type="button"
            className="admin-designation-cancel"
            onClick={resetLocationForm}
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="admin-company-save"
        >
          <Plus size={17} />

          {editingLocation
            ? "Update Location"
            : "Add Location"}
        </button>
      </div>
    </form>

    <div className="admin-designation-list">

      <div className="admin-designation-toolbar">
        <h3>
          Locations ({locations.length})
        </h3>

        <div className="admin-designation-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search locations..."
            value={locationSearch}
            onChange={(e) =>
              setLocationSearch(e.target.value)
            }
          />
        </div>
      </div>

      {filteredLocations.length > 0 ? (
        <div className="admin-designation-table-wrapper">
          <table className="admin-designation-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLocations.map(
                (location) => (
                  <tr key={location.id}>
                    <td>
                      <strong>
                        {location.name}
                      </strong>
                    </td>

                    <td>{location.city}</td>

                    <td>
                      {location.state || "—"}
                    </td>

                    <td>{location.country}</td>

                    <td>
                      <div className="admin-designation-row-actions">
                        <button
                          type="button"
                          title="Edit location"
                          onClick={() =>
                            handleEditLocation(
                              location
                            )
                          }
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          className="delete"
                          title="Delete location"
                          onClick={() =>
                            handleDeleteLocation(
                              location
                            )
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-org-placeholder">
          <MapPin size={36} />
          <h3>No locations found</h3>
          <p>
            Add your first office location above.
          </p>
        </div>
      )}

    </div>
  </div>
)}
{activeTab === "teams" && (
  <div className="admin-designation-section">

    <form
      className="admin-designation-form"
      onSubmit={handleTeamSubmit}
    >
      <div className="admin-designation-form-header">
        <h3>
          {editingTeam
            ? "Edit Team"
            : "Add Team"}
        </h3>
      </div>

      <div className="admin-team-form-grid">

        <div className="admin-company-field">
          <label>Team Name</label>
          <input
            type="text"
            name="name"
            value={teamForm.name}
            onChange={handleTeamChange}
            placeholder="Example: Backend Development"
            required
          />
        </div>

        <div className="admin-company-field">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={teamForm.department}
            onChange={handleTeamChange}
            placeholder="Example: Engineering"
            required
          />
        </div>

        <div className="admin-company-field full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={teamForm.description}
            onChange={handleTeamChange}
            placeholder="Enter team description"
            rows="3"
          />
        </div>

      </div>

      <div className="admin-designation-actions">
        {editingTeam && (
          <button
            type="button"
            className="admin-designation-cancel"
            onClick={resetTeamForm}
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="admin-company-save"
        >
          <Plus size={17} />

          {editingTeam
            ? "Update Team"
            : "Add Team"}
        </button>
      </div>
    </form>

    <div className="admin-designation-list">

      <div className="admin-designation-toolbar">
        <h3>
          Teams ({teams.length})
        </h3>

        <div className="admin-designation-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search teams..."
            value={teamSearch}
            onChange={(e) =>
              setTeamSearch(e.target.value)
            }
          />
        </div>
      </div>

      {filteredTeams.length > 0 ? (
        <div className="admin-designation-table-wrapper">
          <table className="admin-designation-table">
            <thead>
              <tr>
                <th>Team</th>
                <th>Department</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTeams.map((team) => (
                <tr key={team.id}>
                  <td>
                    <strong>{team.name}</strong>
                  </td>

                  <td>{team.department}</td>

                  <td>
                    {team.description || "—"}
                  </td>

                  <td>
                    <div className="admin-designation-row-actions">
                      <button
                        type="button"
                        title="Edit team"
                        onClick={() =>
                          handleEditTeam(team)
                        }
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="delete"
                        title="Delete team"
                        onClick={() =>
                          handleDeleteTeam(team)
                        }
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-org-placeholder">
          <Users size={36} />
          <h3>No teams found</h3>
          <p>
            Add your first team above.
          </p>
        </div>
      )}

    </div>
  </div>
)}
{activeTab === "hierarchy" && (
  <div className="admin-designation-section">

    <form
      className="admin-designation-form"
      onSubmit={handleHierarchySubmit}
    >
      <div className="admin-designation-form-header">
        <h3>
          {editingHierarchy
            ? "Edit Reporting Relationship"
            : "Add Reporting Relationship"}
        </h3>
      </div>

      <div className="admin-team-form-grid">

        <div className="admin-company-field">
          <label>Role / Designation</label>

          <input
            type="text"
            name="role"
            value={hierarchyForm.role}
            onChange={handleHierarchyChange}
            placeholder="Example: Software Engineer"
            required
          />
        </div>

        <div className="admin-company-field">
          <label>Reports To</label>

          <input
            type="text"
            name="reportsTo"
            value={hierarchyForm.reportsTo}
            onChange={handleHierarchyChange}
            placeholder="Example: Engineering Manager"
            required
          />
        </div>

      </div>

      <div className="admin-designation-actions">
        {editingHierarchy && (
          <button
            type="button"
            className="admin-designation-cancel"
            onClick={resetHierarchyForm}
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="admin-company-save"
        >
          <Plus size={17} />

          {editingHierarchy
            ? "Update Relationship"
            : "Add Relationship"}
        </button>
      </div>
    </form>

    <div className="admin-designation-list">

      <div className="admin-designation-toolbar">
        <h3>
          Reporting Hierarchy ({hierarchy.length})
        </h3>
      </div>

      {hierarchy.length > 0 ? (
        <div className="admin-designation-table-wrapper">

          <table className="admin-designation-table">
            <thead>
              <tr>
                <th>Role / Designation</th>
                <th>Reports To</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {hierarchy.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.role}</strong>
                  </td>

                  <td>{item.reportsTo}</td>

                  <td>
                    <div className="admin-designation-row-actions">

                      <button
                        type="button"
                        title="Edit relationship"
                        onClick={() =>
                          handleEditHierarchy(item)
                        }
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="delete"
                        title="Delete relationship"
                        onClick={() =>
                          handleDeleteHierarchy(item)
                        }
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      ) : (
        <div className="admin-org-placeholder">
          <Network size={36} />

          <h3>No reporting hierarchy found</h3>

          <p>
            Add your first reporting relationship above.
          </p>
        </div>
      )}

    </div>
  </div>
)}

{activeTab !== "company" &&
  activeTab !== "designations" &&
  activeTab !== "locations" &&
  activeTab !== "teams" &&
  activeTab !== "hierarchy" && (
    <div className="admin-org-placeholder">
      <Building2 size={36} />
      <h3>{getTitle()}</h3>
      <p>We will build this section next.</p>
    </div>
  )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminOrganization;