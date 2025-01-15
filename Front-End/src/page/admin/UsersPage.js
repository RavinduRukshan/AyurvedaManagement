import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/templetes/Navbar";
import Sidebar from "../../components/templetes/SideBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../css/admin/UsersPage.css";

const UsersPage = () => {
  const [popupType, setPopupType] = useState(null);  // State to track which popup is open

  // Functions to open different popups
  const openRegisterPopup = () => setPopupType("register");
  const openUpdatePopup = () => setPopupType("update");
  const closePopup = () => setPopupType(null);  // Close all popups

  return (
    <div className="users-page-container">
      <Navbar />
      <div className="users-content">
        <div className="breadcrumbs">
          <span>Home</span> / <span>Users</span>
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
                  <th>Staff Id</th>
                  <th>User Name</th>
                  <th>User Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td> {/* User Id */}
                    <td>{i + 101}</td> {/* Staff Id */}
                    <td>User {i + 1}</td> {/* User Name */}
                    <td>{i % 2 === 0 ? "Admin" : "User"}</td> {/* User Role */}
                    <td>{i % 2 === 0 ? "Active" : "Inactive"}</td> {/* Status */}
                    <td>{`2025-01-${String(i + 1).padStart(2, "0")}`}</td> {/* Last Login */}
                    <td>
                      <Link
                        to={`/UserView-page/${i + 1}`}
                        className="btn-action btn-view"
                      >
                        View
                      </Link>
                      <button
                        className="btn-action btn-update"
                        onClick={openUpdatePopup}
                      >
                        Update
                      </button>
                      <button className="btn-action btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Popup for User Registration */}
      {popupType === "register" && (
        <div className="users-popup-overlay" onClick={closePopup}>
          <div
            className="users-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>User Registration </h3>
            <form className="users-popup-form">
              <input type="text" placeholder="Staff Name" />
              <input type="text" placeholder="User Name" />
              <input type="password" placeholder="Password" />
              <select defaultValue="">
                <option value="" disabled>Role</option>
                <option value="">Admin</option>
                <option value="">Doctor</option>
                <option value="">Operator</option>
              </select>
              <select defaultValue="">
                <option value="" disabled>Status</option>
                <option value="">Active</option>
                <option value="">Inactive</option>
              </select>
              <button type="submit" className="users-register-btn">
                Register
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Popup for User Update */}
      {popupType === "update" && (
        <div className="users-popup-overlay" onClick={closePopup}>
          <div
            className="users-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>User Update </h3>
            <form className="users-popup-form">
              <input type="text" placeholder="Staff Name" />
              <input type="text" placeholder="User Name" />
              <input type="password" placeholder="Password" />
              <select defaultValue="">
                <option value="" disabled>Role</option>
                <option value="">Admin</option>
                <option value="">Doctor</option>
                <option value="">Operator</option>
              </select>
              <select defaultValue="">
                <option value="" disabled>Status</option>
                <option value="">Active</option>
                <option value="">Inactive</option>
              </select>
              <button type="submit" className="users-register-btn">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
