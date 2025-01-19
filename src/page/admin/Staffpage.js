import React, { useState, useEffect } from "react"; // Importing necessary React hooks
// import { Link } from "react-router-dom"; // For navigation between pages
import axios from "axios"; // For making HTTP requests
import Navbar from "../../components/templetes/Navbar"; // Importing the Navbar component
import Sidebar from "../../components/templetes/SideBar"; // Importing the Sidebar component
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome icons
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS for styling
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS for interactive components
import "../../css/admin/Staff.css"; // Custom styling for the Staff page

// Functional component for the Staff page
const Staffpage = () => {
  // State hooks to manage various states of the component
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false); // Open/close state for the create popup
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false); // Open/close state for the update popup
  
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null); 

  const [selectedStaffId, setSelectedStaffId] = useState(null); // Store selected staff id for delete action
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false); // Open/close state for delete confirmation
  const [roles, setRoles] = useState([]); // Store fetched roles
  const [dispensaries, setDispensaries] = useState([]); // Store fetched dispensaries
  const [staff, setStaff] = useState([]); // Store staff list
  const [stafsForm, setStaffForm] = useState({ // Store form data
    id: "",
    name: "",
    email: "",
    contactNumber: "",
    role: "",
    dispensary: "",
    status: "",
    address: "",
    salary:"",
    hireDate:""
  });

  

  // Fetch Roles from API
  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/roles");
      setRoles(response.data); // Store roles in state
    } catch (error) {
      console.error("There was an error fetching roles!", error);
    }
  };

  // Fetch Dispensaries from API
  const fetchDispensaries = async () => {
    try {
      const response = await axios.get("http://localhost:8080/dispensaries");
      setDispensaries(response.data); // Store dispensaries in state
    } catch (error) {
      console.error("There was an error fetching dispensaries!", error);
    }
  };

  // Fetch Staff list from API
  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:8080/staff/list");
      setStaff(response.data); // Store staff data in state
    } catch (error) {
      console.error("There was an error fetching staff data!", error);
    }
  };

  // Effect hook to fetch roles, dispensaries, and staff when the component mounts
  useEffect(() => {
    fetchRoles();
    fetchDispensaries();
    fetchStaff();
  }, []); // Empty dependency array means it runs only once after the initial render

  // Handle input change for the staff form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "role" || name === "dispensary") {
      // If role or dispensary is being changed, update the form state with the id
      setStaffForm((prevState) => ({
        ...prevState,
        [name]: { id: value }
      }));
    } else {
      // Otherwise, update the form state normally
      setStaffForm((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Handle form submission (both create and update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      const formData = {
        ...stafsForm,
        roleId: stafsForm.role.id, // Ensure roleId is passed correctly
        dispensaryId: stafsForm.dispensary.id // Ensure dispensaryId is passed correctly
      };

      // Check if the staff has an ID (update case)
      if (stafsForm.id) {
        response = await axios.put(`http://localhost:8080/staff/update/${stafsForm.id}`, formData, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      } else {
        // Otherwise, it's a create case
        response = await axios.post("http://localhost:8080/staff/save", formData, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      }

      console.log(stafsForm.id ? "Staff updated:" : "Staff saved:", response.data);
      setIsCreatePopupOpen(false);
      setIsUpdatePopupOpen(false);
      fetchStaff(); // Fetch updated staff list
      setStaffForm({
        id: "",
        name: "",
        email: "",
        contactNumber: "",
        role: "",
        dispensary: "",
        status: "",
        address: "",
        salary:"",
        hireDate:""
      });
    } catch (error) {
      console.error(stafsForm.id ? "Error updating staff:" : "Error saving staff:", error);
    }
  };

  // Open the create popup (reset form)
  const openCreatePopup = () => {
    setIsCreatePopupOpen(true);
    setStaffForm({
      id: "",
      name: "",
      email: "",
      contactNumber: "",
      role: "",
      dispensary: "",
      status: "",
      address: "",
      salary:"",
      hireDate:""
    });
  };

  // Open the update popup with selected staff's data
  const openUpdatePopup = (staffMember) => {
    setIsUpdatePopupOpen(true);
    setStaffForm(staffMember);
  };
  //new
  const openProfilePopup = (staffMember) => {
    setSelectedStaff(staffMember); // Set the selected staff member to display their profile
    setIsProfilePopupOpen(true);
  };

  // Close both popups
  const closePopup = () => {
    setIsCreatePopupOpen(false);
    setIsUpdatePopupOpen(false);

    setIsProfilePopupOpen(false); //new
  };

  // Open delete confirmation popup for the selected staff member
  const openDeleteConfirmation = (staffId) => {
    setSelectedStaffId(staffId);
    setIsDeleteConfirmationOpen(true);
  };

  // Handle staff deletion
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/staff/delete/${selectedStaffId}`);
      console.log('Staff deleted:', response.data);
      fetchStaff(); // Fetch updated staff list after deletion
      setIsDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting staff:", error);
      setIsDeleteConfirmationOpen(false);
    }
  };

  // Cancel delete action
  const cancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <div className="Staff-page-container">
      <Navbar /> {/* Display the Navbar */}
      <div className="Staff-content">
        {/* <div className="breadcrumbs">
          <span>Home</span> / <span>Staff</span>
        </div> */}
        <div className="Staff-top-section">
          <div className="Staff-actions-container">
            <div className="Staff-search-container">
              <input
                type="text"
                placeholder="Search for Staff"
                className="Staff-search-bar"
              />
              <i className="fas fa-search Staff-search-icon"></i>
            </div>
            <button className="Staff-add-btn" onClick={openCreatePopup}>
              <i className="fas fa-user-plus"></i> Add New User
            </button>
          </div>
        </div>

        <div className="Staff-main-content">
          <Sidebar /> {/* Display the Sidebar */}
          <div className="Staff-table-container">
            <h4>Staff List</h4>
            <table className="Staff-table">
              <thead>
                <tr>
                  <th>Staff Id</th>
                  <th>Staff Name</th>
                  <th>Staff Role</th>
                  <th>Status</th>
                  <th>Hire Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.length > 0 ? (
                  staff.map((staffMember) => (
                    <tr key={staffMember.id}>
                      <td>{staffMember.id}</td>
                      <td>{staffMember.name}</td>
                      <td>{staffMember.role ? staffMember.role.roleName : "N/A"}</td>
                      <td>{staffMember.status}</td>
                      <td>{staffMember.hireDate}</td>
                      <td>
                      
                        <button
                          className="btn-action btn-view"
                          onClick={() => openProfilePopup(staffMember)} // Open profile popup on click
                        >View</button>
                        <button
                          className="btn-action btn-update"
                          onClick={() => openUpdatePopup(staffMember)}
                        >
                          Update
                        </button>
                        <button
                          className="btn-action btn-delete"
                          onClick={() => openDeleteConfirmation(staffMember.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No staff found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete confirmation popup */}
      {isDeleteConfirmationOpen && (
        <div className="staff-popup-overlay-delete" >
          <div className="staff-popup-content-delete" onClick={(e) => e.stopPropagation()}>
            <h3 className="delete-text">Are you sure you want to delete this?</h3>
            <div className="confirmation-buttons">
              <button className="btn-action btn-view" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn-action btn-delete" onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      

      {/* Create new staff popup */}
      {isCreatePopupOpen && (
        <div className="Staff-popup-overlay" >
          <div className="Staff-popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Staff Registration</h3>
            <form className="Staff-popup-form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={stafsForm.name}
                onChange={handleInputChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={stafsForm.email}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="contactNumber"
                placeholder="Phone number"
                value={stafsForm.contactNumber}
                onChange={handleInputChange}
                required
              />

              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={stafsForm.salary}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={stafsForm.address}
                onChange={handleInputChange}
                required
              />

              <select
                name="status"
                value={stafsForm.status || ""}
                onChange={handleInputChange}
                required
              >

                <option value="" disabled>
                  Select Status
                </option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                name="role"
                value={stafsForm.role.id || ""}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Role</option>
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.roleName}
                    </option>
                  ))
                ) : (
                  <option value="">No roles available</option>
                )}
              </select>

              <select
                name="dispensary"
                value={stafsForm.dispensary.id || ""}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Dispensary</option>
                {dispensaries.length > 0 ? (
                  dispensaries.map((dispensary) => (
                    <option key={dispensary.id} value={dispensary.id}>
                      {dispensary.name}
                    </option>
                  ))
                ) : (
                  <option value="">No dispensaries available</option>
                )}
              </select>

              <input
                type="date"
                name="hireDate"
                placeholder="Hire Date"
                value={stafsForm.hireDate}
                onChange={handleInputChange}
                required
              />

              <button type="submit" className="Staff-register-btn">
                Register
              </button>
              <button type="submit" onClick={closePopup} className="Staff-close-btn">
                Close
              </button>

            </form>
          </div>
        </div>
      )}


      {/* Update staff popup */}
      {isUpdatePopupOpen && (
        <div className="Staff-popup-overlay" >
          <div className="Staff-popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Update Staff Information</h3>
            <form className="Staff-popup-form" onSubmit={handleFormSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={stafsForm.name}
                onChange={handleInputChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={stafsForm.email}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="contactNumber"
                placeholder="Phone number"
                value={stafsForm.contactNumber}
                onChange={handleInputChange}
              />

              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={stafsForm.salary}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={stafsForm.address}
                onChange={handleInputChange}
              />

              <select
                name="status"
                value={stafsForm.status || ""}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                name="role"
                value={stafsForm.role.id || ""}
                onChange={handleInputChange}
              >           
                <option value="" disabled>Role</option>
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.roleName}
                    </option>
                  ))
                ) : (
                  <option value="">No roles available</option>
                )}
              </select>

              <select
                name="dispensary"
                value={stafsForm.dispensary.id || ""}
                onChange={handleInputChange}
              >
                <option value="" disabled>Dispensary</option>
                {dispensaries.length > 0 ? (
                  dispensaries.map((dispensary) => (
                    <option key={dispensary.id} value={dispensary.id}>
                      {dispensary.name}
                    </option>
                  ))
                ) : (
                  <option value="">No dispensaries available</option>
                )}
              </select>

              <input
                type="date"
                name="hireDate"
                placeholder="Hire Date"
                value={stafsForm.hireDate}
                onChange={handleInputChange}
              />

              <button type="submit" className="Staff-register-btn">
                Update
              </button>
              <button type="submit" onClick={closePopup} className="Staff-close-btn">
                Close
              </button>
              
            </form>
          </div>
        </div>
      )}



    {/* View Profile  */}

        {isProfilePopupOpen && selectedStaff && (
          <div className="profile-popup-overlay" >
            <div className="profile-popup-content" onClick={(e) => e.stopPropagation()}>
              <h3>{selectedStaff.name}'s Profile</h3>
              <div className="profile-info">
                <p><strong>Email: </strong> {selectedStaff.email}</p>
                <p><strong>Contact Number: </strong> {selectedStaff.contactNumber}</p>
                <p><strong>Salary: </strong>Rs. {selectedStaff.salary}</p>
                <p><strong>Address: </strong> {selectedStaff.address}</p>
                <p><strong>Status: </strong> {selectedStaff.status}</p>
                <p><strong>Role: </strong> {selectedStaff.role ? selectedStaff.role.roleName : "N/A"}</p>
                <p><strong>Dispensary: </strong> {selectedStaff.dispensary ? selectedStaff.dispensary.name : "N/A"}</p>
                <p><strong>Hire Date: </strong> {selectedStaff.hireDate}</p>
              </div>
              <button onClick={closePopup} className="btn-close-new">Close
              </button>
            </div>
          </div>
        )}




    </div>
  );
};

export default Staffpage;
