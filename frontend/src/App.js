import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'; // adjust the path if it's inside a /components folder

// your page components
import Homepage from './pages/Homepage';
import Therapists from './pages/TherapistPage';
import Clients from './pages/ClientPage';
import Sessions from './pages/SessionPage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/therapists" element={<Therapists />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/sessions" element={<Sessions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
