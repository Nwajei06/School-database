import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // <-- Import Bootstrap Icons
import { useNavigate } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    setTimeout(() => {
      setIsLoggingIn(false);
      setShowLoader(true);
    }, 1000);
  };

  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showLoader, navigate]);

  if (showLoader) {
    return (
      <div className="logo-loader-screen">
        <div className="logo-circle">
          <div className="logo-ring"></div>
          <span className="logo-text">YourApp</span>
        </div>
        <h4 className="text-white mt-4 fw-bold">Preparing your dashboard...</h4>

        <style>{`
          .logo-loader-screen {
            height: 100vh;
            width: 100vw;
            background: radial-gradient(circle, #6f42c1, #3b2e7e);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
          }

          .logo-circle {
            position: relative;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: rgba(255,255,255,0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            animation: pulse-ring 2s infinite ease-in-out;
          }

          .logo-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 4px solid white;
            border-radius: 50%;
            animation: spin-ring 1.5s linear infinite;
            opacity: 0.5;
          }

          .logo-text {
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 2;
            color: white;
          }

          @keyframes pulse-ring {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
            70% { transform: scale(1.1); box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
          }

          @keyframes spin-ring {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-purple">Login</h2>
          <p className="text-muted">Welcome back! Please login to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-purple">Name</label>
            <input
              type="text"
              className="form-control border-purple"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-purple">Email</label>
            <input
              type="email"
              className="form-control border-purple"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-purple">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control border-purple pe-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} toggle-password`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>

          <button type="submit" className="btn btn-purple w-100" disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
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
        .toggle-password {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          font-size: 1.25rem;
          color: #6f42c1;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Login;
