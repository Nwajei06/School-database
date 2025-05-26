import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaGraduationCap, FaBook, FaCheckCircle, FaTrophy, FaBars
} from 'react-icons/fa';
import {
  FiSettings, FiLogOut
} from 'react-icons/fi';
import {
  MdDashboard, MdPeople, MdSubject, MdAssessment, MdClass
} from 'react-icons/md';

const Dashboard = () => {
  const [fadeInClass, setFadeInClass] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeInClass('fade-in'), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const { email } = JSON.parse(storedUser);

    fetch(`/api/results?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        // If backend returns an object like { results: [...] }
        // setResults(data.results);

        // If backend returns array directly (correct)
        setResults(Array.isArray(data) ? data : []); // ✅ ensure it's an array
      })
      .catch((err) => {
        console.error(err);
        setResults([]);
      });
  }
}, []);


  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => {
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  return (
    <div className="min-vh-100 bg-light position-relative">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white sticky-top">
        <button className="btn btn-outline-secondary d-md-none" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <h6 style={{ opacity: '0' }}></h6>
        <h4>Hey, {user.name || 'User'}</h4>
        <div className="d-none d-md-block text-muted small">{user.email}</div>
        <img src="/image/pfp.jpeg" alt="Profile" className="rounded-circle" width={40} height={40} />
      </div>

      {/* Sidebar */}
      <aside className={`bg-purple text-white p-3 position-fixed top-0 start-0 h-100 ${
        isSidebarOpen ? 'd-block' : 'd-none'
      } d-md-block`} style={{ width: '250px', zIndex: 1050, backgroundColor: '#6f42c1' }}>
        <div className="text-center py-3 fw-bold fs-5 border-bottom border-light">SCHOOL.DB</div>
        <nav className="mt-3 d-flex flex-column gap-2">
          <NavItem icon={<MdDashboard />} label="Dashboard" active onClick={closeSidebar} />
          <NavItem icon={<MdPeople />} label="Pay fees" onClick={closeSidebar} />
          <NavItem icon={<MdSubject />} label="Subjects" onClick={closeSidebar} />
          <NavItem icon={<MdAssessment />} label="Results" onClick={closeSidebar} />
          <NavItem icon={<MdClass />} label="About" onClick={closeSidebar} />
          <NavItem icon={<FiSettings />} label="Settings" onClick={closeSidebar} />
        </nav>
        <div className="border-top pt-3 mt-auto">
          <NavItem icon={<FiLogOut />} label="Logout" onClick={closeSidebar} />
        </div>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none" style={{ zIndex: 1040 }} onClick={toggleSidebar} />
      )}

      {/* Main Content */}
      <main className="p-3" style={{ marginLeft: window.innerWidth >= 768 ? '250px' : 0 }}>
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <StatCard icon={<FaGraduationCap />} label="Pay fees" value="" />
          </div>
          <div className="col-6 col-md-3">
            <StatCard icon={<FaBook />} label="Subjects Offered" value="19" />
          </div>
          <div className="col-6 col-md-3">
            <StatCard icon={<FaCheckCircle />} label="Results Published" value={`${results.length > 0 ? '100%' : '0%'}`} />
          </div>
          <div className="col-6 col-md-3">
            <StatCard icon={<FaTrophy />} label="Average Pass Rate" value="---" />
          </div>
        </div>

        {/* Search Section */}
        <section className="mb-4">
          <h5 className="fw-semibold mb-3">Result Search</h5>
          <div className="d-flex flex-column flex-md-row gap-2 mb-2">
            <input type="text" placeholder="Search by students unique_id" className="form-control" />
            <button className="btn text-white" style={{ backgroundColor: '#6f42c1' }}>Check Result</button>
          </div>
          <div className="d-flex flex-column flex-md-row gap-2">
            <select className="form-select"><option>Class</option></select>
            <select className="form-select"><option>Term</option></select>
            <select className="form-select"><option>Session</option></select>
          </div>
        </section>

        {/* Recent Results */}
        <section>
          <h5 className="fw-semibold mb-3">Recent Results</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-hover bg-white">
              <thead className="table-light">
                <tr>
                  <th>Student Name</th>
                  <th>Subject</th>
                  <th>Total Score</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">No results available</td>
                  </tr>
                ) : (
                  results.map((res, i) => (
                    <tr key={i}>
                      <td>{res.name}</td>
                      <td>{res.subject}</td>
                      <td>{res.score}</td>
                      <td className="text-success">{res.grade}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <div className={`d-flex align-items-center gap-2 p-2 rounded ${
    active ? 'bg-white text-dark fw-semibold' : 'text-white'
  }`} style={{ cursor: 'pointer' }} onClick={onClick}>
    <span>{icon}</span>
    <span>{label}</span>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="card shadow-sm p-3 d-flex flex-row align-items-center gap-3">
    <div className="fs-3" style={{ color: '#6f42c1' }}>{icon}</div>
    <div>
      <div className="text-muted small">{label}</div>
      <div className="fw-semibold fs-5">{value}</div>
    </div>
  </div>
);

export default Dashboard;
