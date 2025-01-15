import React from 'react';
import '../../css/Footer.css';

export default function Footer() {
  return (
    <div>
      <footer
        className="text-white text-center"
        style={{
          backgroundColor: '#d7d7d7',
          color: '#ffffff',
          position: 'relative',
          bottom: '0',
          left: '0',
          right: '0',
          width: '100%',
          zIndex: '1000',
        }}
      >
        <div className="container pt-3">
          {/* Center: Social Media Links */}
          <div className="d-flex flex-column align-items-center">
            <h5 className="text-dark mb-3">GET SOCIAL WITH US</h5>
            <div className="d-flex justify-content-center">
              <a
                href="https://www.facebook.com"
                className="text-dark mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook" style={{ fontSize: '1.5rem' }}></i>
              </a>
              <a
                href="https://www.twitter.com"
                className="text-dark mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-twitter-x" style={{ fontSize: '1.5rem' }}></i>
              </a>
              <a
                href="https://www.instagram.com"
                className="text-dark mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram" style={{ fontSize: '1.5rem' }}></i>
              </a>
              <a
                href="https://www.whatsapp.com"
                className="text-dark mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-whatsapp" style={{ fontSize: '1.5rem' }}></i>
              </a>
              <a
                href="https://www.linkedin.com"
                className="text-dark mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-linkedin" style={{ fontSize: '1.5rem' }}></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
