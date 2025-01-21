import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Navbar from "../../components/templetes/Navbar";
import Sidebar from "../../components/templetes/SideBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../css/admin/UsersPage.css";
import axios from "axios";


const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [userForm, setUserForm] = useState({
    id: "",
    staff: { id: "", name: "" },
    username: "",
    password: "",
    profileImagePath: "",
    role: { id: "", authority: "" },
    lastLogin: "",
    status: "",
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [staffOptions, setStaffOptions] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/list");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/role/list");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "role" || name === "staff") {
      setUserForm((prevState) => ({
        ...prevState,
        [name]: { id: value },
      }));
    } else {
      setUserForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const searchStaff = async (query) => {
    if (!query.trim()) {
      setStaffOptions([]);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/staff/search", { query });
      setStaffOptions(response.data);
    } catch (error) {
      console.error("Error while searching for staff:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (userForm.id) {
        response = await axios.put(
          `http://localhost:8080/user/update/${userForm.id}`,
          userForm,
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        response = await axios.post("http://localhost:8080/user/save", userForm, {
          headers: { "Content-Type": "application/json" },
        });
      }

      console.log(userForm.id ? "User updated:" : "User saved:", response.data);
      setIsRegisterPopupOpen(false);
      setIsUpdatePopupOpen(false);
      fetchUsers();
      setError(null);
      setUserForm({
        id: "",
        staff: { id: "", name: "" },
        username: "",
        password: "",
        profileImagePath: "",
        role: { id: "", authority: "" },
        lastLogin: "",
        status: "",
      });
    } catch (error) {
      console.error(userForm.id ? "Error updating user:" : "Error saving user:", error);
      setError("Failed to save user. Try another username.");
    }
  };

  const handleStaffSelect = (staff) => {
    setUserForm((prevState) => ({
      ...prevState,
      staff: { id: staff.id, name: staff.name },
    }));
    setStaffOptions([]);
  };

  const openRegisterPopup = () => {
    setIsRegisterPopupOpen(true);
    setUserForm({
      id: "",
      staff: { id: "", name: "" },
      username: "",
      password: "",
      profileImagePath: "",
      role: { id: "", authority: "" },
      lastLogin: "",
      status: "",
    });
  };

  const openUpdatePopup = (user) => {
    setIsUpdatePopupOpen(true);
    setUserForm(user);
  };

  const closePopup = () => {
    setIsRegisterPopupOpen(false);
    setIsUpdatePopupOpen(false);
  };

  const openDeleteConfirmation = (userId) => {
    setUserToDelete(userId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/user/delete/${userToDelete}`);
      console.log("User deleted:", response.data);
      setIsDeleteConfirmationOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again.");
      setIsDeleteConfirmationOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <div className="users-page-container">
      <Navbar />
      <div className="users-content">
        <div className="breadcrumbs">
        </div>
        <div className="users-top-section">
          <div className="users-actions-container">
            <div className="users-search-container">
              <input
                type="text"
                placeholder="Search for users"
                className="users-search-bar"
              />
              <i className="fas fa-search users-search-icon"></i>
            </div>
            <button className="users-add-btn" onClick={openRegisterPopup}>
              <i className="fas fa-user-plus"></i> Add New User
            </button>
          </div>
        </div>
  
        <div className="users-main-content">
          <Sidebar />
          <div className="users-table-container">
            <h4>Users List</h4>
            <table className="users-table">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Staff Name</th>
                  <th>User Name</th>
                  <th>User Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.staff.name}</td>
                    <td>{user.username}</td>
                    <td>{user.role.authority}</td>
                    <td>{user.status}</td>
                    <td>
                      
                      <button
                        className="btn-action btn-delete"
                        onClick={() => openDeleteConfirmation(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      {/* Delete Confirmation Popup */}
      {isDeleteConfirmationOpen && (
        <div className="user-popup-overlay-delete">
          <div className="user-popup-content-delete" onClick={(e) => e.stopPropagation()}>
            <h3 className="delete-text">Are you sure you want to delete this user?</h3>
            <div className="confirmation-buttons">
              <button className="btn-action btn-view" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn-action btn-delete" onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
  
      {/* Popup for User Registration */}
      {isRegisterPopupOpen && (
        <div className="users-popup-overlay">
          <div
            className="users-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>User Registration</h3>
            {error && <div className="error-message">{error}</div>}
  
            <form className="users-popup-form" onSubmit={handleFormSubmit}>
              {/* Staff Name Input */}
              <div className="staff-selector-container">
                <input
                  type="text"
                  name="staff"
                  value={userForm.staff.name}
                  onChange={(e) => {
                    handleInputChange(e);
                    searchStaff(e.target.value);
                  }}
                  placeholder="Staff Name"
                  required
                />
                {staffOptions && staffOptions.length > 0 && (
                  <ul className="staff-options">
                    {staffOptions.map((staff) => (
                      <li key={staff.id} onClick={() => handleStaffSelect(staff)}>
                        {staff.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
  
              {/* Username Input */}
              <input
                type="text"
                name="username"
                value={userForm.username}
                onChange={handleInputChange}
                placeholder="User Name"
                required
              />
  
              {/* Password Input */}
              <input
                type="password"
                name="password"
                value={userForm.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
  
              {/* Role Selection */}
              <select
                name="role"
                value={userForm.role.id || ""}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Role
                </option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.authority}
                  </option>
                ))}
              </select>
  
              {/* Status Selection */}
              <select
                name="status"
                value={userForm.status || ""}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Status
                </option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
  
              <button type="submit" className="users-register-btn">
                Register
              </button>
              <button type="submit" onClick={closePopup} className="users-close-btn">
                Close
              </button>
            </form>
          </div>
        </div>
      )}
  
      {/* Popup for User Update */}
      {isUpdatePopupOpen && (
        <div className="users-popup-overlay" onClick={closePopup}>
          <div
            className="users-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Update User</h3>
            {error && <div className="error-message">{error}</div>}
  
            <form className="users-popup-form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="staff"
                value={userForm.staff.name || ""}
                onChange={(e) => {
                  handleInputChange(e);
                  searchStaff(e.target.value);
                }}
                placeholder="Staff Name"
                required
              />
              {staffOptions && staffOptions.length > 0 && (
                <ul className="staff-options">
                  {staffOptions.map((staff) => (
                    <li key={staff.id} onClick={() => handleStaffSelect(staff)}>
                      {staff.name}
                    </li>
                  ))}
                </ul>
              )}
  
              <input
                type="text"
                name="username"
                value={userForm.username}
                onChange={handleInputChange}
                placeholder="User Name"
                required
              />
  
              
  
              <select
                name="role"
                value={userForm.role.id || ""}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Role
                </option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.authority}
                  </option>
                ))}
              </select>
  
              <select
                name="status"
                value={userForm.status}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Status
                </option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
  
              <button type="submit" className="users-update-btn">
                Update User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default UsersPage;