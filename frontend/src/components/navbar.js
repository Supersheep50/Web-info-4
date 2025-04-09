import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">TCMS</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-3">
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/homepage') ? 'text-white' : 'text-secondary'}`} to="/homepage">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/therapists') ? 'text-white' : 'text-secondary'}`} to="/therapists">Therapists</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/clients') ? 'text-white' : 'text-secondary'}`} to="/clients">Clients</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/sessions') ? 'text-white' : 'text-secondary'}`} to="/sessions">Sessions</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
