import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [subAdmins, setSubAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'viewer' });

  useEffect(() => {
    fetchStudents();
    fetchSubAdmins();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch('http://localhost:5000/api/students');
    const data = await res.json();
    setStudents(data);
  };

  const fetchSubAdmins = async () => {
    const res = await fetch('http://localhost:5000/api/sub-admins');
    const data = await res.json();
    setSubAdmins(data);
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/admins/add-sub-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    fetchSubAdmins();
    setFormData({ name: '', email: '', password: '', role: 'viewer' });
    setShowForm(false);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Superior Admin Dashboard</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Subordinate Admins</h5>
              <p className="card-text display-6">{subAdmins.length}</p>
            </div>
          </div>
          <ul className="list-group">
            {subAdmins.map((admin) => (
              <li key={admin.id} className="list-group-item">
                <strong>{admin.name}</strong> - {admin.email} ({admin.role})
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Students</h5>
              <p className="card-text display-6">{students.length}</p>
            </div>
          </div>
          <ul className="list-group">
            {students.map((student) => (
              <li key={student.id} className="list-group-item">
                {student.name} - {student.email}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center">
        <button className="btn btn-warning" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close Form' : 'Add New Admin'}
        </button>
      </div>

      {showForm && (
        <form className="mt-4" onSubmit={handleAddAdmin}>
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
            <div className="col-md-1">
              <button className="btn btn-primary w-100" type="submit">
                Add
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdminDashboard;
