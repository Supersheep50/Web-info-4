import React, { useEffect, useState } from 'react';

function ClientPage() {

const [clients, setClients] = useState([]);
const [editingId, setEditingId] = useState(null);
const [editedData, setEditedData] = useState({});

useEffect(() => {
    fetch('http://localhost:5050/api/clients')
        .then(response => response.json())
        .then(data => setClients(data))
        .catch(error => console.error('Error fetching clients:', error));

}, []);

const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    fetch(`http://localhost:5050/api/clients/${id}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (res.ok) {
                setClients(prev => prev.filter(t => t.id !== id));
            } else {
                console.error('Failed to delete client');
            }
        })
        .catch(err => console.error('Error deleting client:', err));
}

const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newClient = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        regularity: formData.get("regularity"),
    };

    fetch("http://localhost:5050/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
    })
        .then((res) => res.json())
        .then((data) => {
            setClients((prev) => [...prev, { ...newClient, id: data.id }]);
            e.target.reset();
        })
        .catch((err) => console.error("Error creating client:", err));
}

const handleEdit = (client) => { 
    setEditingId(client.id);
    setEditedData({ ...client });
}

const handleChange = (e) => {
    setEditedData({
        ...editedData,
        [e.target.name]: e.target.value
    });
}

const handleSave = () => {
    fetch(`http://localhost:5050/api/clients/${editingId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedData),
    })
        .then(res => {
            if (res.ok) {
                setClients(prev => prev.map(t => t.id === editingId ? editedData : t));
                setEditingId(null);
                setEditedData({});
            } else {
                console.error('Failed to update client');
            }
        })
        .catch(err => console.error('Error updating client:', err));
}

return (
  <div className="container mt-4">
    <h2 className="mb-4">Client Dashboard</h2>

    <form onSubmit={handleCreate} className="mb-4">
      <div className="row g-2">
        
        <div className="col"><input name="name" placeholder="Name" className="form-control" required /></div>
        <div className="col"><input name="email" placeholder="Email" className="form-control" required /></div>
        <div className="col"><input name="phone" placeholder="Phone" className="form-control" required /></div>
        
        <div className="col">
          <select name="regularity" className="form-control" required>
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
          <th>Regularity</th>
          <th></th>

        </tr>
      </thead>
      
      <tbody>
{clients.map((t) => (
  <tr key={t.id}>
      {editingId === t.id ? (
      <>
        <td><input name="name" value={editedData.name} onChange={handleChange} /></td>
        <td><input name="phone" value={editedData.phone} onChange={handleChange} /></td>
        <td><input name="email" value={editedData.email} onChange={handleChange} /></td>
      
        <td>
          <select name="regularity" value={editedData.regularity} onChange={handleChange}>
            <option value="WEEKLY">WEEKLY</option>
            <option value="MONTHLY">MONTHLY</option>
          </select>
        </td>
        <td>
          <button onClick={handleSave} className="btn btn-success btn-sm">Save</button>
        </td>
      </>
    ) : (
      <>
        <td>{t.name}</td>
        <td>{t.phone}</td>
        <td>{t.email}</td>
        <td>{t.regularity}</td>
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

export default ClientPage;