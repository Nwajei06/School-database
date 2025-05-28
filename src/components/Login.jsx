import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/email-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));

      setIsLoading(false);
      setShowAnimation(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 4000);

    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (showAnimation) {
    return (
      <div className="logo-loader-screen">
        <div className="logo-circle">
          <div className="logo-ring"></div>
          <span className="logo-text">YourApp</span>
        </div>
        <h4 className="text-white mt-4 fw-bold">Redirecting to your dashboard...</h4>

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
          <p className="text-muted">Welcome back! Enter your email</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label text-purple">Your email</label>
            <input
              type="email"
              className="form-control border-purple"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="@gmail.com"
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-purple w-100" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>

      <style>{`
        .text-purple { color: #6f42c1; }
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

export default Login;
