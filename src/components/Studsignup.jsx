import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    setTimeout(() => {
      setIsLoggingIn(false);
      setShowLoader(true); // Show custom loader
    }, 1000); // Simulated login delay
  };

  // After loader shows, wait 5 seconds, then redirect
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
      <div className="loader-screen">
        <div className="custom-loader"></div>
        <h4 className="text-white mt-4">Preparing your dashboard...</h4>

        <style>{`
          .loader-screen {
            height: 100vh;
            width: 100vw;
            background: #6f42c1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .custom-loader {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #ffffff;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
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
          <div className="mb-4">
            <label className="form-label text-purple">Your password</label>
            <input
              type="password"
              className="form-control border-purple"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-purple w-100" disabled={isLoggingIn}>
            {isLoggingIn ? (
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

export default Login;
