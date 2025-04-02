import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Homepage';
import TherapistPage from './pages/TherapistPage';
import ClientPage from './pages/ClientPage';
import SessionPage from './pages/SessionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/therapists" element={<TherapistPage />} />
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/sessions" element={<SessionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
