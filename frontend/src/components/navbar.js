import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">TCMS</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-3">
          <li className="nav-item">
            <Link className="nav-link active" to="/homepage">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-secondary" to="/therapists">Therapists</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-secondary" to="/clients">Clients</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-secondary" to="/sessions">Sessions</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
