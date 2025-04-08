import React, { useEffect, useState } from 'react';

function ClientPage() {

const [clients, setClients] = useState([]);

useEffect(() => {
    fetch('http://localhost:5050/api/clients')
        .then(response => response.json())
        .then(data => setClients(data))
        .catch(error => console.error('Error fetching clients:', error));

}, []);


return (
  <div className="container mt-4">
    <h2 className="mb-4">Client Dashboard</h2>

    <form className="mb-4">
      <div className="row g-2">
        
        <div className="col"><input name="name" placeholder="Name" className="form-control" required /></div>
        <div className="col"><input name="email" placeholder="Email" className="form-control" required /></div>
        <div className="col"><input name="phone" placeholder="Phone" className="form-control" required /></div>
        
        <div className="col">
          <select name="availability" className="form-control" required>
            <option value="">Select</option>
            <option value="WEEKLY">WEEKLY</option>
            <option value="MONTHLY">MONTHLY</option>
          </select>
        </div>
        <div className="col"><button type="submit" className="btn btn-success w-100">Add</button></div>
      </div>
    </form>

    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Appointments</th>
        </tr>
      </thead>
      {/*
      <tbody>
{therapists.map((t) => (
  <tr key={t.id}>
    {editingId === t.id ? (
      <>
        <td><input name="name" value={editedData.name} onChange={handleChange} /></td>
        <td><input name="title" value={editedData.title} onChange={handleChange} /></td>
        <td><input name="email" value={editedData.email} onChange={handleChange} /></td>
        <td><input name="location" value={editedData.location} onChange={handleChange} /></td>
        <td><input name="years_of_practice" type="number" value={editedData.years_of_practice} onChange={handleChange} /></td>
        <td>
          <select name="availability" value={editedData.availability} onChange={handleChange}>
            <option value="TAKING CLIENTS">TAKING CLIENTS</option>
            <option value="NOT TAKING CLIENTS">NOT TAKING CLIENTS</option>
          </select>
        </td>
        <td>
          <button onClick={handleSave} className="btn btn-success btn-sm">Save</button>
        </td>
      </>
    ) : (
      <>
        <td>{t.name}</td>
        <td>{t.title}</td>
        <td>{t.email}</td>
        <td>{t.location}</td>
        <td>{t.years_of_practice}</td>
        <td>{t.availability}</td>
        <td>
          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(t)}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.id)}>Delete</button>
        </td>
      </>
    )}
  </tr>
))}
</tbody>
*/}
    </table>
  </div>
);
}

export default ClientPage;