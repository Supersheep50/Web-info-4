import React, { useEffect, useState } from 'react';

function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  // Fetch data
  useEffect(() => {
    fetch('http://localhost:5050/api/sessions')
      .then((res) => res.json())
      .then((data) => setSessions(data));

    fetch('http://localhost:5050/api/therapists')
      .then((res) => res.json())
      .then((data) => setTherapists(data));

    fetch('http://localhost:5050/api/clients')
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSession = {
      therapist_id: formData.get('therapist_id'),
      client_id: formData.get('client_id'),
      notes: formData.get('notes'),
      date: formData.get('date'),
      length: formData.get('length'),
    };
  
    fetch('http://localhost:5050/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSession),
    })
      .then((res) => res.json())
      .then(() => {
        //  Re-fetch full session list to get therapist/client names included - stops me having to refresh manually
        fetch('http://localhost:5050/api/sessions')
          .then((res) => res.json())
          .then((data) => setSessions(data));
  
        e.target.reset(); // clear the form
      });
  };
  
  

  const handleEdit = (session) => {
    setEditingId(session.id);
    setEditedData({ ...session });
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const formattedDate = new Date(editedData.date).toISOString().split('T')[0];
  
    const payload = {
      ...editedData,
      date: formattedDate,
    };
  
    fetch(`http://localhost:5050/api/sessions/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        setSessions((prev) =>
          prev.map((s) => (s.id === editingId ? { ...editedData, date: formattedDate } : s))
        );
        setEditingId(null);
        setEditedData({});
      }
    });
  };
  

  const handleDelete = (id) => {
    if (!window.confirm('Delete this session?')) return;

    fetch(`http://localhost:5050/api/sessions/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        setSessions((prev) => prev.filter((s) => s.id !== id));
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Sessions Dashboard</h2>

      <form onSubmit={handleCreate} className="mb-4">
        <div className="row g-2">
          <div className="col">
            <select name="therapist_id" className="form-control" required>
              <option value="">Therapist</option>
              {therapists.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <select name="client_id" className="form-control" required>
              <option value="">Client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <input name="date" type="date" className="form-control" required />
          </div>
          <div className="col">
            <input name="length" type="number" placeholder="Minutes" className="form-control" required />
          </div>
          <div className="col">
            <input name="notes" placeholder="Notes" className="form-control" />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-success w-100">
              Add
            </button>
          </div>
        </div>
      </form>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Therapist</th>
            <th>Client</th>
            <th>Date</th>
            <th>Length (min)</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s.id}>
              {editingId === s.id ? (
                <>
                  <td>
                    <select
                      name="therapist_id"
                      value={editedData.therapist_id}
                      onChange={handleChange}
                      className="form-control"
                    >
                      {therapists.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      name="client_id"
                      value={editedData.client_id}
                      onChange={handleChange}
                      className="form-control"
                    >
                      {clients.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      name="date"
                      type="date"
                      value={editedData.date}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      name="length"
                      value={editedData.length}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      name="notes"
                      value={editedData.notes}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <button onClick={handleSave} className="btn btn-success btn-sm">
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{s.therapist_name}</td>
                  <td>{s.client_name}</td>

                  <td>{new Date(s.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>


                  <td>{s.length}</td>
                  <td>{s.notes}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(s)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>
                      Delete
                    </button>
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

export default SessionsPage;
