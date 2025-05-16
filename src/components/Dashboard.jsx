import React from 'react';
import { FaGraduationCap, FaBook, FaCheckCircle, FaTrophy, FaBars } from 'react-icons/fa';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { MdDashboard, MdPeople, MdSubject, MdClass, MdAssessment } from 'react-icons/md';

const Dashboard = () => {
  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside className="text-white d-flex flex-column p-3" style={{ width: '250px', backgroundColor: '#6f42c1' }}>
        <div className="text-center py-3 fw-bold fs-4 border-bottom border-light">SCHOOL.DB</div>
        <nav className="flex-grow-1">
          <NavItem icon={<MdDashboard />} label="Dashboard" active />
          <NavItem icon={<MdPeople />} label="Pay fees" />
          <NavItem icon={<MdSubject />} label="Subjects" />
          <NavItem icon={<MdAssessment />} label="Results" />
          <NavItem icon={<MdClass />} label="About" />
          <NavItem icon={<FiSettings />} label="Settings" />
        </nav>
        <div className="border-top pt-3">
          <NavItem icon={<FiLogOut />} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fs-3 fw-bold">Welcome Admin</h1>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-secondary">
              <FaBars />
            </button>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="rounded-circle"
              width={40}
              height={40}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="row mt-4">
          <div className="col-md-3">
            <StatCard icon={<FaGraduationCap />} label="Total Students" value="1,200" />
          </div>
          <div className="col-md-3">
            <StatCard icon={<FaBook />} label="Subjects Offered" value="23" />
          </div>
          <div className="col-md-3">
            <StatCard icon={<FaCheckCircle />} label="Results Published" value="95%" />
          </div>
          <div className="col-md-3">
            <StatCard icon={<FaTrophy />} label="Average Pass Rate" value="87%" />
          </div>
        </div>

        {/* Search Section */}
        <section className="mt-5">
          <h2 className="fs-5 fw-semibold mb-3">Result Search</h2>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <input
              type="text"
              placeholder="Search by Student Name / Reg No"
              className="form-control me-2 flex-grow-1"
            />
            <button className="btn text-white" style={{ backgroundColor: '#6f42c1' }}>
              Check Result
            </button>
          </div>
          <div className="d-flex gap-2 mb-4">
            <select className="form-select">
              <option>Class</option>
            </select>
            <select className="form-select">
              <option>Term</option>
            </select>
            <select className="form-select">
              <option>Session</option>
            </select>
          </div>
        </section>

        {/* Recent Results */}
        <section className="mt-4">
          <h2 className="fs-5 fw-semibold mb-3">Recent Results</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-hover bg-white">
              <thead className="table-light">
                <tr>
                  <th>Student Name</th>
                  <th>Reg No</th>
                  <th>Class</th>
                  <th>Term</th>
                  <th>Total Score</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Jane Doe', reg: 'ST1023', class: 'SS1 A', term: '1st', score: 788, grade: 'Passed' },
                  { name: 'John Smith', reg: 'ST1056', class: 'SS2 B', term: '1st', score: 652, grade: 'Passed' },
                  { name: 'Mary Chiriwe', reg: 'ST1089', class: 'JSS3 A', term: '2nd', score: 499, grade: 'Passed' },
                ].map((student, i) => (
                  <tr key={i}>
                    <td>{student.name}</td>
                    <td>{student.reg}</td>
                    <td>{student.class}</td>
                    <td>{student.term}</td>
                    <td>{student.score}</td>
                    <td className="text-success">{student.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active }) => (
  <div
    className={`d-flex align-items-center gap-2 p-2 rounded ${
      active ? 'bg-white text-dark fw-semibold' : 'hover-bg-light'
    }`}
    style={{ cursor: 'pointer' }}
  >
    <span>{icon}</span>
    <span>{label}</span>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="card shadow-sm p-3 d-flex flex-row align-items-center gap-3">
    <div className="fs-3" style={{ color: '#6f42c1' }}>
      {icon}
    </div>
    <div>
      <div className="text-muted small">{label}</div>
      <div className="fw-semibold fs-5">{value}</div>
    </div>
  </div>
);

export default Dashboard;
