import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is imported
import user from '../../assets/user.png';
import arrow from '../../assets/arrow.png';

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
                <button
                  className="nav-link text-white me-2"
                  style={{ background: 'none', border: 'none' }}
                  onClick={() => { /* Your click handler code here */ }}
                >
                  <img
                    src={user}
                    alt="user"
                    style={{ width: '37px', paddingRight: '9px', marginRight: '5px' }}
                  />
                  <img
                    src={arrow}
                    alt="arrow"
                    style={{ width: '15px' }}
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
