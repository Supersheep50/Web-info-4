import React, { useEffect, useState } from 'react';

function TherapistPage() {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/api/therapists')
    .then(response => response.json())
    .then(data => setTherapists(data))

    .catch(error => console.error('Error fetching therapists:', error));
  
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this therapist?")) return;
  
    fetch(`http://localhost:5050/api/therapists/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setTherapists(prev => prev.filter(t => t.id !== id));
        } else {
          console.error('Failed to delete therapist');
        }
      })
      .catch(err => console.error('Error deleting therapist:', err));
  };
  

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Therapist Dashboard</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Email</th>
            <th>Location</th>
            <th>Years</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
  {therapists.map((t) => (
    <tr key={t.id}>
      <td>{t.name}</td>
      <td>{t.title}</td>
      <td>{t.email}</td>
      <td>{t.location}</td>
      <td>{t.years_of_practice}</td>
      <td>{t.availability}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(t.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

export default TherapistPage;
