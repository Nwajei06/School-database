import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login processing (2 seconds)
    setTimeout(() => {
      setIsLoading(false);
      setShowAnimation(true); // show animation screen

      // Wait 5 seconds for animation, then navigate
      setTimeout(() => {
        navigate('/dashboard');
      }, 5000);
    }, 2000);
  };

  // 🔁 Animation screen while redirecting
  if (showAnimation) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
        <div className="spinner-border text-purple" style={{ width: '4rem', height: '4rem' }} role="status"></div>
        <p className="mt-3 text-purple fs-5">Redirecting to your dashboard...</p>

        <style>{`
          .text-purple {
            color: #6f42c1;
          }
        `}</style>
      </div>
    );
  }

  // 🧾 Login form UI
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

      {/* Custom styling */}
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
