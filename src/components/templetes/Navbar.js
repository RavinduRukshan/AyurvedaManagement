
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is imported
import user from '../../assets/user.png';
import arrow from '../../assets/arrow.png';
import "../../css//Navbar.css"; // Custom styling for the Staff page

export default function Navbar() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{ backgroundColor: '#24757e', color: '#ffffff' }}
      >
        <div className="container-fluid">
          {/* Navigation Links */}
          <div className="d-flex align-items-center flex-wrap flex-lg-nowrap w-100 justify-content-end">
            <ul className="navbar-nav d-flex flex-row w-auto mt-2 mt-lg-0">
              <li className="nav-items">
                {/* Dropdown for Profile and Logout */}
                <div className="dropdown">
                  <button
                    className="nav-link text-white dropdown-toggle"
                    style={{ background: 'none', border: 'none' }}
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={user}
                      alt="user"
                      style={{
                        width: '37px',
                        paddingRight: '9px',
                        marginRight: '5px',
                      }}
                    />
                    <img
                      src={arrow}
                      alt="arrow"
                      style={{ width: '15px' }}
                    />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                      <a className="dropdown-item" href="#profile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#logout">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
