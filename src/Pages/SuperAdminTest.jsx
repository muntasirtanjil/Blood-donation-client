
import { use, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

import {
  FaUsers,
  FaSearch,
  FaUserShield,
  FaEye,
  FaTimes,
  FaEnvelope,
  FaCalendarAlt,
  FaIdCard,
  FaShieldAlt,
  FaTrash,
} from "react-icons/fa";

const API_URL = "https://blood-donation-server-silk.vercel.app";

const SuperAdminTest = () => {
  const { auth } = use(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [deletingUid, setDeletingUid] = useState(null);
  const [currentRole, setCurrentRole] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setError("");

      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error("Please login first");
      }

      const token = await currentUser.getIdToken();

      const response = await fetch(`${API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data.users || []);

      // Find currently logged-in user's role
      const loggedInUser = data.users.find(
        (user) => user.uid === currentUser.uid,
      );

      setCurrentRole(loggedInUser?.role || "");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [auth]);

  // Delete user
  const handleDeleteUser = async (user) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return Swal.fire("Error", "Please login first", "error");
    }

    // Frontend protection
    if (user.uid === currentUser.uid) {
      return Swal.fire(
        "Not Allowed",
        "You cannot delete your own account.",
        "warning",
      );
    }

    if (user.role === "superadmin") {
      return Swal.fire(
        "Not Allowed",
        "Super Admin account cannot be deleted.",
        "warning",
      );
    }

    if (currentRole === "admin" && user.role !== "user") {
      return Swal.fire(
        "Not Allowed",
        "Admin can only delete normal users.",
        "warning",
      );
    }

    // Confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `
        You are going to delete
        <strong>${user.name || user.email}</strong>.
        <br/><br/>
        This will permanently delete their Firebase account,
        user information and donor profile.
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingUid(user.uid);

      const token = await currentUser.getIdToken();

      const response = await fetch(
        `${API_URL}/admin/users/${user.uid}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      // Close details modal if the deleted user was selected
      if (selectedUser?.uid === user.uid) {
        setSelectedUser(null);
      }

      // Refresh user list
      await fetchUsers();

      Swal.fire({
        title: "Deleted!",
        text: data.message || "User deleted successfully.",
        icon: "success",
        confirmButtonColor: "#16a34a",
      });
    } catch (error) {
      console.error("Delete user error:", error);

      Swal.fire({
        title: "Delete Failed",
        text: error.message || "Something went wrong.",
        icon: "error",
      });
    } finally {
      setDeletingUid(null);
    }
  };

  // Search users
  const filteredUsers = users.filter((user) =>
    `${user.name || ""} ${user.email || ""} ${user.role || ""}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-gray-500 mt-2">
            View and manage all registered LifeDrop users.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-error mb-6">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

          <div className="card bg-base-100 shadow">
            <div className="card-body flex-row items-center gap-4">
              <div className="bg-primary/10 text-primary p-4 rounded-xl">
                <FaUsers size={28} />
              </div>

              <div>
                <p className="text-gray-500">Total Users</p>
                <h2 className="text-3xl font-bold">
                  {users.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body flex-row items-center gap-4">
              <div className="bg-secondary/10 text-secondary p-4 rounded-xl">
                <FaUserShield size={28} />
              </div>

              <div>
                <p className="text-gray-500">Admins</p>
                <h2 className="text-3xl font-bold">
                  {
                    users.filter(
                      (user) =>
                        user.role === "admin" ||
                        user.role === "superadmin",
                    ).length
                  }
                </h2>
              </div>
            </div>
          </div>

        </div>

        {/* Users Table */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">

            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-5">
              <h2 className="text-xl font-bold">
                All Registered Users
              </h2>

              <label className="input input-bordered flex items-center gap-2">
                <FaSearch />

                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user, index) => {

                    const isOwnAccount =
                      user.uid === auth.currentUser?.uid;

                    const isSuperAdmin =
                      user.role === "superadmin";

                    const canDelete =
                      !isOwnAccount &&
                      !isSuperAdmin &&
                      (currentRole === "superadmin" ||
                        (currentRole === "admin" &&
                          user.role === "user"));

                    return (
                      <tr key={user.uid}>

                        <td>{index + 1}</td>

                        <td className="font-semibold">
                          {user.name || "N/A"}
                        </td>

                        <td>{user.email}</td>

                        <td>
                          <span
                            className={`badge ${
                              user.role === "superadmin"
                                ? "badge-primary"
                                : user.role === "admin"
                                  ? "badge-secondary"
                                  : "badge-ghost"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td>
                          {user.createdAt
                            ? new Date(
                                user.createdAt,
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td>
                          <div className="flex items-center gap-2">

                            <button
                              onClick={() => setSelectedUser(user)}
                              className="btn btn-sm btn-outline btn-primary"
                            >
                              <FaEye />
                              View
                            </button>

                            {canDelete && (
                              <button
                                onClick={() =>
                                  handleDeleteUser(user)
                                }
                                disabled={deletingUid !== null}
                                className="btn btn-sm btn-error text-white"
                              >
                                {deletingUid === user.uid ? (
                                  <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                  <FaTrash />
                                )}

                                Delete
                              </button>
                            )}

                          </div>
                        </td>

                      </tr>
                    );
                  })}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8">
                        No users found.
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="modal modal-open">
            <div className="modal-box max-w-lg">

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  User Details
                </h3>

                <button
                  onClick={() => setSelectedUser(null)}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-5">

                <div>
                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <h3 className="font-semibold text-lg">
                    {selectedUser.name || "N/A"}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-primary" />

                  <div>
                    <p className="text-sm text-gray-500">
                      Email Address
                    </p>

                    <p className="font-medium break-all">
                      {selectedUser.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaIdCard className="text-primary" />

                  <div>
                    <p className="text-sm text-gray-500">
                      Firebase UID
                    </p>

                    <p className="font-medium break-all">
                      {selectedUser.uid || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-primary" />

                  <div>
                    <p className="text-sm text-gray-500">
                      Account Role
                    </p>

                    <span className="badge badge-primary">
                      {selectedUser.role || "user"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-primary" />

                  <div>
                    <p className="text-sm text-gray-500">
                      Account Created
                    </p>

                    <p className="font-medium">
                      {selectedUser.createdAt
                        ? new Date(
                            selectedUser.createdAt,
                          ).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="divider"></div>

                <p className="text-sm text-gray-500">
                  Email verification status is not currently
                  included in the Users API response.
                </p>

              </div>

              <div className="modal-action">

                {(
                  selectedUser.uid !== auth.currentUser?.uid &&
                  selectedUser.role !== "superadmin" &&
                  (currentRole === "superadmin" ||
                    (currentRole === "admin" &&
                      selectedUser.role === "user"))
                ) && (
                  <button
                    onClick={() => handleDeleteUser(selectedUser)}
                    disabled={deletingUid !== null}
                    className="btn btn-error text-white"
                  >
                    <FaTrash />
                    Delete User
                  </button>
                )}

                <button
                  onClick={() => setSelectedUser(null)}
                  className="btn btn-primary"
                >
                  Close
                </button>

              </div>
            </div>

            <div
              className="modal-backdrop"
              onClick={() => setSelectedUser(null)}
            ></div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SuperAdminTest;
