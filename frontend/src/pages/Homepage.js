import React from 'react';

function Homepage() {
  return (
    <div className="container mt-5 text-black">
      <h1 className="mb-4">Welcome to Tranquil Minds Therapy Clinic</h1>

      <p>
        Tranquil Minds offers professional mental health support through scheduled one-to-one therapy sessions. 
        Our licensed therapists are available for both short-term and long-term counselling, depending on your needs.
      </p>

      <h4 className="mt-4">How to Book a Session</h4>
      <ul>
        <li>Browse available therapists on the <strong>Therapists</strong> page</li>
        <li>View or manage clients on the <strong>Clients</strong> page</li>
        <li>Create and manage appointments on the <strong>Sessions</strong> dashboard</li>
      </ul>

      <h4 className="mt-4">Using This App</h4>
      <ul>
        <li><strong>Therapists</strong> — Add, edit, and remove therapist profiles</li>
        <li><strong>Clients</strong> — Register new clients and manage their records</li>
        <li><strong>Sessions</strong> — Link therapists and clients to schedule and track appointments</li>
      </ul>

      <p className="mt-4">
        All session history is securely stored and can be accessed or modified by authorized users only. For support, please contact the system administrator.
      </p>
    </div>
  );
}

export default Homepage;
