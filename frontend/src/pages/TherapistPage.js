import React, { useEffect, useState } from 'react';

function TherapistPage() {
  const [therapists, setTherapists] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});


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

  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTherapist = {
      title: formData.get("title"),
      name: formData.get("name"),
      email: formData.get("email"),
      location: formData.get("location"),
      years_of_practice: formData.get("years"),
      availability: formData.get("availability"),
    };

    fetch("http://localhost:5050/api/therapists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTherapist),
    })
      .then((res) => res.json())
      .then((data) => {
        setTherapists((prev) => [...prev, { ...newTherapist, id: data.id }]);
        e.target.reset();
      })
      .catch((err) => console.error("Error creating therapist:", err));
  };

  const handleEdit = (therapist) => {
    setEditingId(therapist.id);
    setEditedData({ ...therapist });
  };
  
  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSave = () => {
    fetch(`http://localhost:5050/api/therapists/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedData),
    })
      .then((res) => res.json())
      .then(() => {
        setTherapists((prev) =>
          prev.map((t) => (t.id === editingId ? editedData : t))
        );
        setEditingId(null);
        setEditedData({});
      })
      .catch((err) => console.error('Error updating therapist:', err));
  };
  

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Therapist Dashboard</h2>

      <form onSubmit={handleCreate} className="mb-4">
        <div className="row g-2">
          <div className="col"><input name="title" placeholder="Title" className="form-control" required /></div>
          <div className="col"><input name="name" placeholder="Name" className="form-control" required /></div>
          <div className="col"><input name="email" placeholder="Email" className="form-control" required /></div>
          <div className="col"><input name="location" placeholder="Location" className="form-control" required /></div>
          <div className="col"><input name="years" type="number" placeholder="Years" className="form-control" required /></div>
          <div className="col">
            <select name="availability" className="form-control" required>
              <option value="">Select</option>
              <option value="TAKING CLIENTS">TAKING CLIENTS</option>
              <option value="NOT TAKING CLIENTS">NOT TAKING CLIENTS</option>
            </select>
          </div>
          <div className="col"><button type="submit" className="btn btn-success w-100">Add</button></div>
        </div>
      </form>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Email</th>
            <th>Location</th>
            <th>Years</th>
            <th>Availability</th>
            <th></th>
          </tr>
        </thead>
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

      </table>
    </div>
  );
}

export default TherapistPage;
