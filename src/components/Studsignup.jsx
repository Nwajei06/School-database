import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false); // New state to toggle visibility

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup data:', formData);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px', borderRadius: '20px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-purple">Student Login</h2>
          <p className="text-muted">Welcome! Please create your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-purple">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control border-purple"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-purple">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control border-purple"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-purple">Middle Name</label>
            <input
              type="text"
              name="middleName"
              className="form-control border-purple"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label text-purple">Create Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="form-control border-purple pe-5"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '10px',
                top: '38px',
                cursor: 'pointer',
                color: '#6f42c1'
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="btn btn-purple w-100 mb-3">
            Login
          </button>

          <div className="text-center">
            <span>Already have an account? </span>
            <Link to="/studentsignin" className="text-purple fw-semibold">Sign in</Link>
          </div>
        </form>
      </div>

      <style>{`
        .text-purple {
          color: #6f42c1;
        }
        .btn-purple {
          background-color: #6f42c1;
          color: white;
          font-weight: bold;
        }
        .btn-purple:hover {
          background-color: #5a379e;
        }
        .border-purple {
          border: 1px solid #6f42c1;
        }
      `}</style>
    </div>
  );
}

export default Signup;
