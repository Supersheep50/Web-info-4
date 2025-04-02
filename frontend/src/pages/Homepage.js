import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Therapist Client Management System</h1>
      <Link to="/therapists"><button>Therapists</button></Link>
      <Link to="/clients"><button>Clients</button></Link>
      <Link to="/sessions"><button>Sessions</button></Link>
    </div>
  );
}

export default HomePage;
